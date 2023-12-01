import React, { createContext, useContext, useReducer } from 'react';

export type ApprovedImagesState = {
  approvedImages: number[];
};

export type ApprovedImagesAction = {
  type: 'addApprovedImage' | 'removeApprovedImage';
  imageId?: number;
};

const defaultApprovedImagesState: ApprovedImagesState = {
  approvedImages: [],
};

function approvedImagesReducers(
  state: ApprovedImagesState,
  { type, imageId }: ApprovedImagesAction
): ApprovedImagesState {
  switch (type) {
    case 'addApprovedImage':
      return {
        ...state,
        approvedImages: [...state.approvedImages, imageId!],
      };

    case 'removeApprovedImage':
      return {
        ...state,
        approvedImages: state.approvedImages.filter((id) => id !== imageId),
      };

    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
}

export type UserState = {
  loggedIn: boolean;
  username: string; // Add username property
};

export type UserAction = {
  type: 'toggleLoggedIn' | 'updateUsername'; // Add updateUsername action type
  username?: string; // Add username parameter
};

const defaultUserState: UserState = {
  loggedIn: false,
  username: '', // Add a default value for username
};
function userReducers(state: UserState, { type, username }: UserAction): UserState {
  switch (type) {
    case 'toggleLoggedIn':
      return {
        ...state,
        loggedIn: !state.loggedIn,
      };

    case 'updateUsername':
      return {
        ...state,
        username: username || '',
      };


    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
}

type CombinedState = UserState & ApprovedImagesState;

const UserContext = createContext<CombinedState>({} as CombinedState);
const UserDispatchContext = createContext<{
  userDispatch: React.Dispatch<UserAction>;
  approvedImagesDispatch: React.Dispatch<ApprovedImagesAction>;
}>({
  userDispatch: (() => {}) as React.Dispatch<UserAction>,
  approvedImagesDispatch: (() => {}) as React.Dispatch<ApprovedImagesAction>,
});


const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userState, userDispatch] = useReducer(userReducers, defaultUserState);
  const [approvedImagesState, approvedImagesDispatch] = useReducer(
    approvedImagesReducers,
    defaultApprovedImagesState
  );

  const combinedState: CombinedState = {
    ...userState,
    approvedImages: approvedImagesState.approvedImages,
  };

  return (
    <UserContext.Provider value={combinedState}>
      <UserDispatchContext.Provider
        value={{ userDispatch, approvedImagesDispatch }}
      >
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const { loggedIn, approvedImages, username } = useContext(UserContext);

  return {
    loggedIn,
    approvedImages,
    username,
  };
};


export const useUserMutations = () => {
  const { userDispatch, approvedImagesDispatch } = useContext(UserDispatchContext);

  const toggleLoggedIn = () =>
    userDispatch({
      type: 'toggleLoggedIn',
    });

  const addApprovedImage = (imageId: number) =>
    approvedImagesDispatch({
      type: 'addApprovedImage',
      imageId,
    });

  const removeApprovedImage = (imageId: number) =>
    approvedImagesDispatch({
      type: 'removeApprovedImage',
      imageId,
    });
    

  return {
    toggleLoggedIn,
    addApprovedImage,
    removeApprovedImage,
    userDispatch, // Ensure that userDispatch is included in the returned object
  };
};

export { UserContext, UserDispatchContext };
export default UserProvider;