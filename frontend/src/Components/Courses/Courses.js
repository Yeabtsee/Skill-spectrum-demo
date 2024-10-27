import React,{useState,useEffect} from 'react'
import Banner from './Banner'
import Body from './Body'
import Registration from '../Home/Registration'
import Testimonial from '../Home/Testimonials'


const Courses = () => {
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
      <Body/>  
      {!isAuthenticated && <Registration/>}
      <Testimonial/>
    </>
  )
}

export default Courses