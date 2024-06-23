import React, { useState, useEffect } from 'react';
import image from '../../Assets/user-profile.png';
import { Link } from 'react-router-dom';
import apis from '../../apis/apis';
// import './SignUp.module.css'

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };

  useEffect(() => {
    apis.isLogged()
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
    if (formData.password !== formData.confirmPassword) {
      setError({ ...error, confirmPassword: 'Password does not match' });
      return;
    }
    apis
      .register(formData)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          localStorage.setItem('access_token', res.data['token']);
          window.location.href = '/home';
        }
      })
      .catch((err) => {
        console.log(err);
        let newErrors = { username: "", email: "", password: "", confirmPassword: "" };
        for (let key in err.response.data) {
          newErrors[key] = err.response.data[key][0];
        }
        setError(newErrors);
      });
  };

  if (loading) {
    return <></>;
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              name="username"
              type="text"
              className={`form-control ${error.username ? 'is-invalid' : ''}`}
              id="username"
              placeholder="Username"
              onChange={handleChange}
              style={{
                margin: "0px"
              
              }}
              required
            />
            {error.username && <div className="invalid-feedback">{error.username}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              name="email"
              type="email"
              className={`form-control ${error.email ? 'is-invalid' : ''}`}
              id="email"
              placeholder="name@example.com"
              onChange={handleChange}
              style={{
                margin: "0px"
              }}
              required
            />
            {error.email && <div className="invalid-feedback">{error.email}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              name="password"
              type="password"
              className={`form-control ${error.password ? 'is-invalid' : ''}`}
              id="password"
              placeholder="Password"
              onChange={handleChange}
              style={{
                padding: "10px"
              }}
              required
            />
            {error.password && <div className="invalid-feedback">{error.password}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              className={`form-control ${error.confirmPassword ? 'is-invalid' : ''}`}
              id="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              style={{
                padding: "10px"
              }}
              required
            />
            {error.confirmPassword && <div className="invalid-feedback">{error.confirmPassword}</div>}
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">Sign Up</button>
          </div>
        </form>
        <div className="text-center mt-3">
          <p>Already have an account? <Link to="/">Login</Link></p>
        </div>
      </div>
    </div>
  );
}
