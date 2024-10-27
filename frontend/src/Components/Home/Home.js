import React,{useState,useEffect} from 'react'
import Carousel from './Carousel'
import About from './about'
import Courses from './Courses'
import Registration from './Registration'
import Team from './Team'
import Testimonials from './Testimonials'

const Home = () => {

  
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
      <Carousel/>
      <About />
      <Courses/>
      {!isAuthenticated && <Registration/>}
      <Team/>
      <Testimonials/>
    </>
  )
}

export default Home;