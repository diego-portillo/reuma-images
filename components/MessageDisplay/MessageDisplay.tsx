import React, { useEffect, useContext, useState } from 'react';
import { Message, Button } from 'semantic-ui-react';
import { UserDispatchContext } from '@store/user';

interface MessageDisplayProps {
  message: string;
  messageType: 'success' | 'error' | 'alert';
  containerHeight: number; 
}

const MessageDisplay: React.FC<MessageDisplayProps> = ({ message, messageType, containerHeight  }) => {
  const { messagesDispatch } = useContext(UserDispatchContext);
  const [isVisible, setIsVisible] = useState(!!message); // Show the message initially if it's not empty

  useEffect(() => {
    if (message) {
      setIsVisible(true);

      const timeoutId = setTimeout(() => {
        setIsVisible(false);

        // Clear the message from the global state
        messagesDispatch({
          type: 'setMessage',
          message: '',
          messageType: 'success', // Set the default message type
        });
      }, 15000);

      return () => clearTimeout(timeoutId);
    }
  }, [message, messagesDispatch]);

  const handleClose = () => {
    setIsVisible(false);

    // Clear the message from the global state when the user clicks "OK"
    messagesDispatch({
      type: 'setMessage',
      message: '',
      messageType: 'success', // Set the default message type
    });
  };

  return isVisible ? (
    <div style={{ position: 'absolute', width: '100%', top: 0, zIndex: 9999, height: containerHeight, textAlign:'center' }}>
    
        <Message
        success={messageType === 'success'}
        error={messageType === 'error'}
        warning={messageType === 'alert'}
        onDismiss={handleClose}
        >
        <Message.Header>{messageType === 'success' ? 'Success' : messageType === 'error' ? 'Error' : 'Alert'}</Message.Header>
        <p>{message}</p>
        <Button onClick={handleClose}>OK</Button>
        </Message>
    </div>
  ) : null;
};

export default MessageDisplay;
