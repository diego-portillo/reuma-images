import React, { useEffect, useState } from 'react';
import Layout from '@components/Layout/Layout';
import Link from 'next/link';
import { useUserMutations, useUser } from '@store/user'; 
import { useRouter } from 'next/router';

const LoginPage = () => {
  const { loggedIn } = useUser();
  const router = useRouter();
  const { userDispatch, messagesDispatch } = useUserMutations();
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(loggedIn)
    if (loggedIn) {
      router.push('/');
    } else {
      // Set loading to false once the check is complete
      setLoading(false);
    }
  }, [loggedIn, router]);

  const logIn = () => {
    const usernameElement = document.getElementById('username') as HTMLInputElement | null;
    const passwordElement = document.getElementById('password') as HTMLInputElement | null;

    if (usernameElement && passwordElement) {
      const enteredUsername = usernameElement.value.trim();
      const enteredPassword = passwordElement.value.trim();

      if (enteredUsername === '') {
        // Use setMessages instead of window.alert
        messagesDispatch({
          type: 'setMessage',
          message: 'Debes ingresar tu email para continuar.',
          messageType: 'error',
        });
        return;
      }

      if (enteredPassword === '') {
        messagesDispatch({
          type: 'setMessage',
          message: 'Debes ingresar tu contraseña para continuar.',
          messageType: 'error',
        });
        return;
      }

      userDispatch({
        type: 'login',
        username: enteredUsername,
      });
    }
  };

  return (
    <Layout>
      {loading ? (
        // Show a spinner while loading
        <div className="spinner">Verificando sesion...</div>
      ) : (
        // Render the login form when data is loaded
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', width: '80%', padding: '0 2rem', maxWidth: '22rem', minHeight: '16rem', margin: '0 auto', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', borderRadius: '1rem' }}>
          <div style={{ marginTop: '3rem', fontWeight: 'bold', marginBottom: '2rem', fontSize: '1.5rem' }}>
            Bienvenido/a!
          </div>
          <div style={{ fontSize: '1rem', textAlign: 'left', padding: '0.5rem 0', fontWeight: 'bold' }}>Tu username:</div>
          <input
            style={{ fontSize: '1rem', textAlign: 'center', margin: '0.3rem 0', borderRadius: '0.2rem', border: '1.2px solid rgba(0, 0, 0, 0.2)', outline: 'none' }}
            id='username'
            placeholder='Enter your username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          ></input>
          {/* Assuming you have a password input */}
          <div style={{ fontSize: '1rem', textAlign: 'left', padding: '0.5rem 0', fontWeight: 'bold' }}>Tu contraseña:</div>
          <input
            style={{ fontSize: '1rem', textAlign: 'center', margin: '0.3rem 0 0.7rem 0', borderRadius: '0.2rem', border: '1.2px solid rgba(0, 0, 0, 0.2)', outline: 'none' }}
            id='password'
            type='password'
            placeholder='******'
            required
          ></input>
          <button style={{ margin: '0.5rem 0', fontWeight: 'bold', fontSize: '1.1rem', padding: '1rem 0', background: 'black', color: 'white', cursor: 'pointer', borderRadius: '3rem' }} onClick={logIn}>Iniciar Sesión</button>
          <button style={{ marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '1.1rem', padding: '1rem 0', background: 'black', color: 'white', cursor: 'pointer', borderRadius: '3rem' }} onClick={logIn}>Registrarme</button>
          <Link href="/users/reiniciar-password" passHref>
            <div style={{ fontSize: '0.8rem', textAlign: 'center', margin: '0.4rem 0 1rem 0', fontWeight: 'bold' }}>¿Olvidaste tu contraseña?</div>
          </Link>
        </div>
      )}

      <style jsx>{`
        section {
          text-align: center;
          margin-bottom: 2rem;
        }

        .spinner {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 200px; /* Adjust the height as needed */
        }
      `}</style>
    </Layout>
  );
};

export default LoginPage;
