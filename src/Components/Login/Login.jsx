import React from 'react';
// import styles from './login.module.css';
import { Link } from 'react-router-dom';
import apis from '../../apis/apis';


export default function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  const handleChange = (e) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
    console.log(email, password);
  }
  React.useEffect(() => {
    apis
      .isLogged()
      .then((res) => {
        if (res.status === 200) {
          window.location.href = '/home';
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    apis
      .login({ email:email, password:password })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          localStorage.setItem('access_token', res.data['token']);
          window.location.href = '/home';
        }
      })
      .catch((err) => {
        alert('Invalid email or password');
      });

  }
  if (loading) {
    return <></>;
  }
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Sign In</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input name='email' type="email" className="form-control" id="email" placeholder="name@example.com" style={{
              margin: '0px',
            }} onChange={handleChange} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input name='password' type="password" className="form-control" id="password" placeholder="Password" style={{
              padding: '10px'
            }} onChange={handleChange} required/>
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Sign In</button>
          </div>
        </form>
        <div className="text-center mt-3">
          <p>Doesn't have an account? <Link to="/signup">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
}
