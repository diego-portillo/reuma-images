// user.tsx (modified)
import { createContext, useContext, useReducer, useEffect } from 'react';

export type UserState = {
  loggedIn: boolean;
  username: string;
};

export type ApprovedImagesState = {
  approvedImages: string[];
};

export type MessagesState = {
  message: string;
  type: 'success' | 'error' | 'alert';
};

const defaultMessagesState: MessagesState = {
  message: '',
  type: 'success',
};

export type UserAction = {
  type: 'login' | 'logout';
  username?: string;
};

export type ApprovedImagesAction =
  | { type: 'addApprovedImage'; imageId: string }
  | { type: 'removeApprovedImage'; imageId: string }
  | { type: 'setApprovedImages'; approvedImages: string[] }; 


export type MessagesAction = {
  type: 'setMessage';
  message: string;
  messageType?: 'success' | 'error' | 'alert';
};

const defaultUserState: UserState = {
  loggedIn: false,
  username: '',
};

const defaultApprovedImagesState: ApprovedImagesState = {
  approvedImages: ['2zd33b8c', '6trfgkkj', '7bcr49em', '098323ks', '2zd33b9c'],
};

function userReducers(state: UserState, { type, username }: UserAction): UserState {
  switch (type) {
    case 'login':
      if (!username) {
        throw new Error(`Username cannot be empty when logging in.`);
      }

      return {
        ...state,
        loggedIn: true,
        username: username,
      };

    case 'logout':
      return {
        ...state,
        loggedIn: false,
        username: '',
      };

    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
}

function approvedImagesReducers(
  state: ApprovedImagesState,
  action: ApprovedImagesAction
): ApprovedImagesState {
  switch (action.type) {
    case 'addApprovedImage':
      return {
        ...state,
        approvedImages: [...state.approvedImages, action.imageId],
      };

    case 'removeApprovedImage':
      return {
        ...state,
        approvedImages: state.approvedImages.filter((id) => id !== action.imageId),
      };

    case 'setApprovedImages':
      return {
        ...state,
        approvedImages: action.approvedImages || [],
      };

    default:
      throw new Error(`Unhandled action type: ${action}`);
  }
}




function messagesReducer(state: MessagesState, { type, message, messageType }: MessagesAction): MessagesState {
  switch (type) {
    case 'setMessage':
      return {
        ...state,
        message: message,
        type: messageType || 'success',
      };

    default:
      return state;
  }
}

type CombinedState = UserState & ApprovedImagesState & MessagesState;

const UserContext = createContext<CombinedState>({} as CombinedState);
const UserDispatchContext = createContext<{
  userDispatch: React.Dispatch<UserAction>;
  approvedImagesDispatch: React.Dispatch<ApprovedImagesAction>;
  messagesDispatch: React.Dispatch<MessagesAction>;
}>({
  userDispatch: (() => {}) as React.Dispatch<UserAction>,
  approvedImagesDispatch: (() => {}) as React.Dispatch<ApprovedImagesAction>,
  messagesDispatch: (() => {}) as React.Dispatch<MessagesAction>,
});

const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userState, userDispatch] = useReducer(userReducers, defaultUserState);
  const [approvedImagesState, approvedImagesDispatch] = useReducer(
    approvedImagesReducers,
    defaultApprovedImagesState
  );
  const [messagesState, messagesDispatch] = useReducer(
    messagesReducer,
    defaultMessagesState
  );

  // Load initial state from localStorage on mount
  useEffect(() => {
    const storedLoggedIn = JSON.parse(localStorage.getItem('loggedIn') || 'false');
    const storedUsername = localStorage.getItem('username') || '';
    const storedApprovedImages = JSON.parse(localStorage.getItem('approvedImages') || '[]');
  
    if (storedLoggedIn) {
      userDispatch({ type: 'login', username: storedUsername });
      approvedImagesDispatch({ type: 'setApprovedImages', approvedImages: storedApprovedImages });
    }
  }, []); 
  

  const combinedState: CombinedState = {
    ...userState,
    approvedImages: approvedImagesState.approvedImages,
    message: messagesState.message,
    type: messagesState.type,
  };

  // Save state to localStorage whenever userState or approvedImagesState changes
  useEffect(() => {
    localStorage.setItem('loggedIn', JSON.stringify(userState.loggedIn));
    localStorage.setItem('username', userState.username);
    localStorage.setItem('approvedImages', JSON.stringify(approvedImagesState.approvedImages));
  }, [userState.loggedIn, userState.username, approvedImagesState.approvedImages]);

  return (
    <UserContext.Provider value={combinedState}>
      <UserDispatchContext.Provider
        value={{
          userDispatch,
          approvedImagesDispatch,
          messagesDispatch,
        }}
      >
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
};
export const useUser = () => {
  const { loggedIn, approvedImages, username, message, type } = useContext(UserContext);

  return {
    loggedIn,
    approvedImages,
    username,
    messagesState: { message, type },
  };
};

export const useUserMutations = () => {
  const {
    userDispatch,
    approvedImagesDispatch,
    messagesDispatch,
  } = useContext(UserDispatchContext);

  const addApprovedImage = (imageId: string) =>
    approvedImagesDispatch({
      type: 'addApprovedImage',
      imageId: imageId,
    });

  const removeApprovedImage = (imageId: string) =>
    approvedImagesDispatch({
      type: 'removeApprovedImage',
      imageId: imageId,
    });

  const setMessage = (type: 'setMessage', message: string, messageType?: 'success' | 'error' | 'alert') =>
    messagesDispatch({
      type,
      message,
      messageType,
    });

  const logout = () =>
    userDispatch({
      type: 'logout',
    });

  return {
    addApprovedImage,
    removeApprovedImage,
    setMessage,
    logout,
    userDispatch,
    messagesDispatch,
  };
};

export { UserContext, UserDispatchContext };
export default UserProvider;
