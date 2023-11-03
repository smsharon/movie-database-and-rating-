import React, { useState } from 'react';
import './LoginSignup.css';

const LoginSignup = () => {
  const [action] = useState('Login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const token = sessionStorage.getItem('token');

  const handleClick = async () => {
    const opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: password,
      }),
    };
    fetch('http://localhost:3000/tokens', opts)
      .then((resp) => {
        if (resp.status === 200) return resp.json();
        else alert('Error');
      })
      .then((data) => {
        sessionStorage.setItem('token', data.access_token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="Container">
      <div className="text">{action}</div>
      <div className="underline"></div>
      {token && token !== '' && token !== undefined ? (
        <div>welcome {token}</div>
      ) : (
        <div>
          <div className="inputs">
            <div className="input">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="inputs">
            <div className="input">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handleClick}>Login</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginSignup;
