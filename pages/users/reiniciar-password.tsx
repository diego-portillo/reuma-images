import React from 'react';
import Layout from '@components/Layout/Layout';
import { NavLink } from 'react-router-dom'
const LoginPage = () => {
  const resetPassword = (event: React.MouseEvent) => {
    const emailElement = document.getElementById('email') as HTMLInputElement | null;
    let email = '';

// if (emailElement && passwordElement) {
//   email = emailElement.value;
//   password = passwordElement.value;
// } else {
//   // Handle the case when the elements are not found in the DOM
//   console.error('Email or password element not found.');
// }
//     // const verifyUser =  userContext.registeredUsers.filter(registeredUser => registeredUser.email === email)
//     const verifyUser =  'a';
//     // const password =   document.getElementById('password').value;
//     const isEmailRegistered = true
//     if(!isEmailRegistered){
//       event.preventDefault();
//       window.alert('Email not registered! Please Sign Up to continue.');
//       return
//     }
//     if (verifyUser!= password){
//       event.preventDefault();
//       window.alert('Wrong Password.');
//       return
//     } 
//     // userContext.setUser(verifyUser[0])
//     // userContext.setIsLoggedIn(true)
//     // localStorage.setItem("user", JSON.stringify(verifyUser[0]))
//     // localStorage.setItem("isLoggedIn", "true")
  }
  return (
    <Layout>
      <div style={{ display:'flex',flexDirection: 'column', justifyContent: 'center', textAlign: 'center', width: '80%', padding:'0 2rem', maxWidth: '22rem', minHeight:'16rem', margin:'0 auto', boxShadow:'rgba(0, 0, 0, 0.24) 0px 3px 8px', borderRadius:'1rem'}}>
        <div style={{ marginTop:'3rem', fontWeight:'bold', marginBottom:'2rem', fontSize:'1.5rem'}}>  
          Te enviaremos un correo para recuperar tu contraseña.
        </div>
        <div style={{ fontSize:'1rem',textAlign:'left', padding:'0.5rem 0', fontWeight:'bold'}}>Tu email:</div>
        <input style={{fontSize:'1rem', textAlign:'center', marginBottom:'0.5rem', borderRadius: '0.2rem', border: '1.2px solid rgba(0, 0, 0, 0.2)', outline: 'none'}} id='email' placeholder='hi@helloworld.com' required></input>
        <div style={{ margin:'1rem 0 2rem 0', fontWeight:'bold',fontSize:'1.1rem', padding:'1rem 0', background:'black', color:'white', cursor:'pointer', borderRadius:'3rem'}}>Enviar</div>
    
      </div>
    </Layout>
  )
}
;

export default LoginPage;
