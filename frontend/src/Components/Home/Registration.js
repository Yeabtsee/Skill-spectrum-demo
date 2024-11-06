import React, { useState } from 'react';
import axios from 'axios';

const Registration = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [showResetPasswordForm, setShowResetPasswordForm] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '', // Added fullName
        uni_id: '',       // Added id
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

        // Check if resetting password
        if (showResetPasswordForm) {          
            try {
                const response = await axios.post('/api/forgot-password', { email: formData.email });
                console.log(response.data);
                alert(response.data.message || 'If this email is registered, a password reset link has been sent.');
                setShowResetPasswordForm(false); // Optionally hide the reset form
            } catch (error) {
                console.error("Error:", error);
                alert(error.response?.data?.message || 'Error sending password reset link');
            }
            return; // Exit after handling the reset password
        }

        const url = isLogin ? '/api/users/login' : '/api/users/register';
        const method = 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullName: formData.fullName, 
                    uni_id: formData.uni_id,           
                    username: formData.username, 
                    email: isLogin ? undefined : formData.email,
                    password: formData.password,
                    course: isLogin ? undefined : formData.course
                }),
            });
            const data = await response.json();
           
            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }
            if (isLogin) {
                alert('Login successful!');
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', data.username.toUpperCase());
                window.location.reload();
            } else {
                alert('Registration successful!');
            }
        } catch (error) {
            alert(error.message || 'An error occurred');
        }
    };
    const toggleResetForm = () => setShowResetPasswordForm(!showResetPasswordForm);

    return (
        <div className="container-fluid bg-registration py-5" id="register" style={{ margin: '90px 0' }}>
            <div className="container py-5">
                <div className="row align-items-center">
                    <div className="col-lg-7 mb-5 mb-lg-0">
                        <div className="mb-4">
                            <h1 className="text-primary text-uppercase mb-3" style={{ letterSpacing: '5px' }}>
                                Need Any Courses
                            </h1>
                            <p className="text-white">{isLogin ? (<h1 className="text-white">Please login to continue.</h1>)  : 
                                (
                                <>
                                <h1 className='text-white'>Registrations are now open!</h1>
                                <p>- Secure your place by signing up for your desired course. Hurry up! We have a limited spot for each course.</p>
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
                        {/* Existing informational text content */}
                    </div>
                    <div className="col-lg-5">
                        <div className="card border-0">
                            <div className="card-header bg-light text-center p-4">
                                <h1 className="m-0">{isLogin ? 'Login' : 'Sign Up Now'}</h1>
                            </div>
                            <div className="card-body rounded-bottom bg-primary p-5">
                                <form onSubmit={handleSubmit}>
                                    {!showResetPasswordForm ? (
                                        <>
                                            {isLogin ? (
                                                <>
                                                    
                                                    <div className="form-group">
                                                        <input
                                                            type="text"
                                                            name="username"
                                                            value={formData.username}
                                                            onChange={handleChange}
                                                            className="form-control border-0 p-4"
                                                            placeholder="Your username"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <input
                                                            type="password"
                                                            name="password"
                                                            value={formData.password}
                                                            onChange={handleChange}
                                                            className="form-control border-0 p-4"
                                                            placeholder="Your password"
                                                            required
                                                        />
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="form-group">
                                                        <input
                                                            type="text"
                                                            name="fullName"
                                                            value={formData.fullName}
                                                            onChange={handleChange}
                                                            className="form-control border-0 p-4"
                                                            placeholder="Full Name"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <input
                                                            type="text"
                                                            name="uni_id"
                                                            value={formData.uni_id}
                                                            onChange={handleChange}
                                                            className="form-control border-0 p-4"
                                                            placeholder="ETS 0000/00"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <input
                                                            type="text"
                                                            name="username"
                                                            value={formData.username}
                                                            onChange={handleChange}
                                                            className="form-control border-0 p-4"
                                                            placeholder="Your name"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            value={formData.email}
                                                            onChange={handleChange}
                                                            className="form-control border-0 p-4"
                                                            placeholder="Your email"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <input
                                                            type="password"
                                                            name="password"
                                                            value={formData.password}
                                                            onChange={handleChange}
                                                            className="form-control border-0 p-4"
                                                            placeholder="Your password"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <select
                                                            name="course"
                                                            value={formData.course}
                                                            onChange={handleChange}
                                                            className="custom-select border-0 px-4"
                                                            style={{ height: '47px' }}
                                                            required
                                                        >
                                                            <option value="">Select a course</option>
                                                            <option value="Computer Programming (Python)">Computer Programming (Python)</option>
                                                            {/* <option value="Graphics Design">Graphic Design</option> */}
                                                            <option value="Video Editing">Video Editing</option>
                                                        </select>
                                                    </div>
                                                    
                                                </>
                                            )}
                                            <div>
                                                <button
                                                    className="btn btn-dark btn-block border-0 py-3"
                                                    type="submit"
                                                >
                                                    {isLogin ? 'Login' : 'Sign Up Now'}
                                                </button>
                                                <div className="text-center mt-3">
                                                  <a
                                                      href="#"
                                                      style={{ color: 'white' }}
                                                      onClick={(e) => {
                                                          e.preventDefault();
                                                          setIsLogin(!isLogin);
                                                      }}
                                                  >
                                                      {isLogin ? "Don't have an account? Sign up now" : 'Already have an account? Sign in'}
                                                  </a>
                                               </div>
                                            </div>
                                            {isLogin && (
                                                <p
                                                    onClick={toggleResetForm}
                                                    style={{ cursor: 'pointer', color: 'white', marginTop: '10px', marginLeft: '30%'}}
                                                >
                                                    Forgot Password?
                                                </p>
                                            )}
                                            
                                        </>
                                    ) : (
                                        <>
                                            <h4 className="text-center text-white">Reset Password</h4>                           
                                              <div className="form-group">
                                                  <input
                                                      type="email"
                                                      name="email"
                                                      value={formData.email}
                                                      onChange={handleChange}
                                                      className="form-control border-0 p-4"
                                                      placeholder="Enter your email"
                                                      required
                                                  />
                                              </div>
                                              <button
                                                  className="btn btn-dark btn-block border-0 py-3"
                                                  type="submit"
                                              >
                                                  Send Reset Link
                                              </button>                    
                                            
                                            <p
                                                onClick={toggleResetForm}
                                                style={{ cursor: 'pointer', color: 'white', marginTop: '10px' }}
                                            >
                                                Back to Login
                                            </p>
                                        </>
                                    )}
                                </form>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;