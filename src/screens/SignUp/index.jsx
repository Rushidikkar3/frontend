import React, { useCallback, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Api } from '../../utils/Api';
import './signup.css';

function Index() {
  const history = useHistory();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async () => {
    if (fullName && fullName.length > 2 && email && email.length > 2 && password && password.length > 2) {
      setLoading(true);
      try {
        const { statusCode, data } = await Api.postRequest('/api/user/signup', {
          email,
          fullName,
          password,
        });
        if (statusCode >= 400) {
          throw new Error(data);
        }
        alert(data);
        history.replace('/signin');
      } catch (error) {
        setLoading(false);
        alert(error.message);
      }
    } else {
      alert('Please enter valid inputs.');
    }
  }, [email, fullName, password, history]);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="signupscreen">
      <div className="container">
        <div className="innerContainer">
          <div className="header">
            <div className="back-icon" onClick={() => history.push('/')}>
              <i className="fas fa-arrow-circle-left fa-5x"></i>
            </div>
            <p>Signup</p>
          </div>

          <label htmlFor="fname">Full Name</label>
          <input
            type="text"
            id="fname"
            name="firstname"
            placeholder="Your full name.."
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your email.."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Your Password.."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Link to="/signin" className="link">
            <span>Already have an account?</span>
          </Link>
          <br />

          <input type="submit" value="Sign up" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

export default Index;
