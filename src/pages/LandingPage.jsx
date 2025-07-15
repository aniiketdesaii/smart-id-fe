import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const LandingPage = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div>
      <h1>Smart ID Verifier</h1>
      <button onClick={() => setIsRegister(false)}>Login</button>
      <button onClick={() => setIsRegister(true)}>Register</button>
      <hr />
      {isRegister ? <RegisterForm /> : <LoginForm />}
    </div>
  );
};

export default LandingPage;
