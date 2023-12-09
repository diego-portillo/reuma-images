import React from 'react';
import Layout from '@components/Layout/Layout';
import { useRouter } from 'next/router';
import { useUserMutations } from '@store/user';

const RecoverPasswordPage = () => {
  const { messagesDispatch } = useUserMutations();
  const router = useRouter();
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const resetPassword = (event: React.MouseEvent) => {    
    const email = document.getElementById('email') as HTMLInputElement | null;
    if (email?.value === '') {
      messagesDispatch({
        type: 'setMessage',
        message: 'Debes ingresar tu email para continuar.',
        messageType: 'error',
      });
      return;
    } else if (email?.value === null || email?.value === undefined || !isValidEmail(email?.value)){
      messagesDispatch({
        type: 'setMessage',
        message: 'Email invalido.',
        messageType: 'error',
      });
      return;
    } else {
      messagesDispatch({
        type: 'setMessage',
        message: 'Hemos enviado un email a tu direccion de correo ' + email?.value + '.',
        messageType: 'success',
      });
      router.push('/');  
    }
  }
  return (
    <Layout>
      <div style={{ display:'flex',flexDirection: 'column', justifyContent: 'center', textAlign: 'center', width: '80%', padding:'0 2rem', maxWidth: '22rem', minHeight:'16rem', margin:'0 auto', boxShadow:'rgba(0, 0, 0, 0.24) 0px 3px 8px', borderRadius:'1rem'}}>
        <div style={{ marginTop:'3rem', fontWeight:'bold', marginBottom:'2rem', fontSize:'1.5rem'}}>  
          Te enviaremos un correo para recuperar tu contraseña.
        </div>
        <div style={{ fontSize:'1rem',textAlign:'left', padding:'0.5rem 0', fontWeight:'bold'}}>Tu email:</div>
        <input style={{fontSize:'1rem', textAlign:'center', marginBottom:'0.5rem', borderRadius: '0.2rem', border: '1.2px solid rgba(0, 0, 0, 0.2)', outline: 'none'}} id='email' placeholder='hi@helloworld.com' required></input>
        <div style={{ margin:'1rem 0 2rem 0', fontWeight:'bold',fontSize:'1.1rem', padding:'1rem 0', background:'black', color:'white', cursor:'pointer', borderRadius:'3rem'}} onClick={resetPassword}>Enviar</div>
    
      </div>
    </Layout>
  )
}
;

export default RecoverPasswordPage;
