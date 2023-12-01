import React, { useState } from 'react';
import Layout from '@components/Layout/Layout';
import Link from 'next/link';
import { useUserMutations } from '@store/user'; // Update the path
import { useRouter } from 'next/router';
import { useUser } from '@store/user';

const LoginPage = () => {
  const { loggedIn } = useUser();
  const router = useRouter();
  // Redirect to home if not logged in
  if (loggedIn) {
    router.push('/');
  }
  const { toggleLoggedIn, userDispatch } = useUserMutations();
  const [username, setUsername] = useState('');
  
  const logIn = () => {
    const usernameElement = document.getElementById('username') as HTMLInputElement | null;
    const passwordElement = document.getElementById('password') as HTMLInputElement | null;

    if (usernameElement && passwordElement) {
      const enteredUsername = usernameElement.value.trim();
      const enteredPassword = passwordElement.value.trim();

      if (enteredUsername === '') {
        window.alert('Debes ingresar tu email para iniciar sesión.');
        return;
      }

      if (enteredPassword === '') {
        window.alert('Debes ingresar tu contraseña para iniciar sesión.');
        return;
      }
    toggleLoggedIn();
    userDispatch({
      type: 'updateUsername',
      username: username,
    });
    router.push('/');
  }
};

  return (
    <Layout>
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
        <div style={{ margin: '0.5rem 0', fontWeight: 'bold', fontSize: '1.1rem', padding: '1rem 0', background: 'black', color: 'white', cursor: 'pointer', borderRadius: '3rem' }} onClick={logIn}>Iniciar Sesión</div>
        <div style={{ marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '1.1rem', padding: '1rem 0', background: 'black', color: 'white', cursor: 'pointer', borderRadius: '3rem' }} onClick={logIn}>Registrarme</div>
        <Link href="/users/reiniciar-password" passHref>
          <div style={{ fontSize: '0.8rem', textAlign: 'center', margin: '0.4rem 0 1rem 0', fontWeight: 'bold' }}>¿Olvidaste tu contraseña?</div>
        </Link>
      </div>
    </Layout>
  );
};

export default LoginPage;
