import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, Container } from 'semantic-ui-react';
import { useUser, useUserMutations } from '@store/user';
import MessageDisplay from '@components/MessageDisplay/MessageDisplay';
import { useRouter } from 'next/router';


const Navbar = () => {
  const { pathname } = useRouter();
  const { loggedIn, username, messagesState } = useUser();
  const { logout, messagesDispatch } = useUserMutations(); 
  const router = useRouter();
  const [containerHeight, setContainerHeight] = useState(0);
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const [showMessage, setShowMessage] = useState('');

  useEffect(() => {
    // Clear local messages after 15 seconds
    if (showMessage) {
      const timeoutId = setTimeout(() => {
        setShowMessage('');
      }, 15000);

      return () => clearTimeout(timeoutId);
    }
  }, [showMessage]);

  const handleLogout = () => {
    logout(); 
    router.push('/');
  };


  const showMessageAndDispatch = (message: string, messageType: 'success' | 'error' | 'alert' = 'success') => {
    setShowMessage(message);

    messagesDispatch({
      type: 'setMessage',
      message,
      messageType,
    });
  };

  return (
<Menu size={isMobile ? 'small' : 'large'} borderless style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }} onLoad={(e) => setContainerHeight((e.nativeEvent as any).target.offsetHeight)}>
    {showMessage && (
      <MessageDisplay
        message={showMessage}
        messageType="success"
        containerHeight={containerHeight} // Pass container height as a prop
      />
    )}

    {messagesState.message && (
      <MessageDisplay
        message={messagesState.message}
        messageType={messagesState.type}
        containerHeight={containerHeight} // Pass container height as a prop
      />
    )}
    <Menu.Menu style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
    {!loggedIn && !isMobile && (
        <Link href="/about" passHref>
          <Menu.Item
            title="About"
            className={pathname === '/about' ? 'active-link' : ''}
          >
            Info
          </Menu.Item>
        </Link>
      )}
      <Link href="/" passHref>
        <Menu.Item
          title="Inicio | Todas las imágenes"
          className={pathname === '/' ? 'active-link' : ''}
        >
         Todas las Imágenes
        </Menu.Item>
      </Link>
      
      {!loggedIn && (
        <Link href="/iniciar-sesion" passHref>
          <Menu.Item
            className={pathname === '/iniciar-sesion' ? 'active-link' : ''}
          >
            Iniciar Sesión
          </Menu.Item>
        </Link>
      )}
      {loggedIn && (
        <>
        <Link href="/verify" passHref>
            <Menu.Item
              title="verify"
              className={pathname === '/verify' ? 'active-link' : ''}
            >
              Revisar Imágenes
            </Menu.Item>
          </Link>
          <Menu.Item style={{ display: isMobile ? 'none' : 'flex' }}>
            Bienvenido {username}
          </Menu.Item>
          
          <Menu.Item onClick={handleLogout}>
            Cerrar Sesión
          </Menu.Item>
        </>
      )}
    </Menu.Menu>
  </div>
</Menu>


  );
};

export default Navbar;
