import React, { useState } from 'react';
import axios from 'axios';

const Registration = () => {
    const [isLogin, setIsLogin] = useState(false); // State to toggle between forms
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: '',
      course: ''
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const url = isLogin ? 'http://localhost:5000/api/users/login' : 'http://localhost:5000/api/users/register';
      const method = isLogin ? 'POST' : 'POST';
      
      try {
        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: formData.username, 
            email: isLogin ? undefined : formData.email, // Only include email if not logging in
            password: formData.password,
            course: isLogin ? undefined : formData.course // Only include courseId if registering
          }),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Something went wrong');
        }
        if (isLogin) {
          alert('Login successful!');
          localStorage.setItem('token', data.token);
          localStorage.setItem('username', data.username);
          window.location.reload();
      } else {
          alert('Registration successful!');
      }
      
  
      } catch (error) {
        alert(error.message || 'An error occurred');
      }
    };

  return (
<>
      <div className="container-fluid bg-registration py-5" id='register' style={{ margin: '90px 0' }}>
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-7 mb-5 mb-lg-0">
              <div className="mb-4">
                <h5 className="text-primary text-uppercase mb-3" style={{ letterSpacing: '5px' }}>Need Any Courses</h5>
                <h1 className="text-white">{isLogin ? 'Login to Your Account' : 'Registrations are now open!'}</h1>
              </div>
              <p className="text-white">{isLogin ? (<p>Please login to continue.</p>)  : 
              (
              <>
              <p>Secure your place by signing up for your desired course. Hurry up! We have a limited spot for each course.</p>
               <p className="text-white">What you will get after completion:</p>
              <ul className="list-inline text-white m-0">
                <li className="py-2">
                  <i className="fa fa-check text-primary mr-3"></i>A valuable skill that will open new doors for your future.
                </li>
                <li className="py-2">
                  <i className="fa fa-check text-primary mr-3"></i>Opportunities to build connections with bright-minded individuals.
                </li>
                <li className="py-2">
                  <i className="fa fa-check text-primary mr-3"></i>Official recognition certificates from the university.
                </li>
              </ul>
              </>
              )
              }</p>
             
            </div>
            <div className="col-lg-5">
              <div className="card border-0">
                <div className="card-header bg-light text-center p-4">
                  <h1 className="m-0">{isLogin ? 'Login' : 'Sign Up Now'}</h1>
                </div>
                <div className="card-body rounded-bottom bg-primary p-5">
                  <form onSubmit={handleSubmit}>
                    
                    {!isLogin ? (
                      <>
                        <div className="form-group">
                          <input type="text" name="username" value={formData.username} onChange={handleChange} className="form-control border-0 p-4" placeholder="Your name" required="required" />
                        </div>
                        <div className="form-group">
                          <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control border-0 p-4" placeholder="Your email" required="required" />
                        </div>
                        <div className="form-group">
                          <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-control border-0 p-4" placeholder="Your password" required="required" />
                        </div>
                        <div className="form-group">
                          <select name="course" value={formData.course} onChange={handleChange} className="custom-select border-0 px-4" style={{ height: '47px' }} required="required">
                            <option value="">Select a course</option>
                            <option value="Python">Computer Programming (Python)</option>
                            <option value="Graphics Design">Graphic Design</option>
                            <option value="Video Editing">Video Editing</option>
                          </select>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="form-group">
                          <input type="text" value={formData.username} name='username' onChange={handleChange} className="form-control border-0 p-4" placeholder="Your username" required="required" />
                        </div>
                        <div className="form-group">
                          <input type="password" value={formData.password} name="password" onChange={handleChange}  className="form-control border-0 p-4" placeholder="Your password" required="required" />
                        </div>
                      </>
                    )}
                    <div>
                      <button className="btn btn-dark btn-block border-0 py-3" type="submit">
                        {isLogin ? 'Login' : 'Sign Up Now'}
                      </button>
                    </div>
                  </form>
                  <div className="text-center mt-3">
                    {/* Link to toggle between login and registration */}
                    <a href="#" style={{color:"white"}} onClick={(e) => { e.preventDefault(); setIsLogin(!isLogin); }}>
                      {isLogin ? 'Don\'t have an account? Sign up now' : 'Already have an account? Sign in'}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;

