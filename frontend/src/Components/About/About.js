import React,{useState,useEffect} from 'react'
import Banner from './Banner'
import Info from './Info'
import Registration from '../Home/Registration'
import Testimonial from '../Home/Testimonials'

const About = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

// Check if the user is already authenticated (token exists in localStorage)
useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    setIsAuthenticated(true);
  }
}, []);
  return (
    <>
        <Banner/>
        <Info/>
        {!isAuthenticated && <Registration/>}
        <Testimonial/>
    </>
  )
}

export default About