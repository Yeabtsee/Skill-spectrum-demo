import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import About from './Components/About/About';
import Courses from './Components/Courses/Courses';
import Teachers from './Components/Teachers/Teachers';
import Contact from './Components/Contact/Contact';
import ResetPassword from './Components/ResetPassword';
import Admin from './Components/Admin/Admin';

function App() {
  return (
   <Router>
    <Header/>
    <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/about' element={<About/>}/>
     <Route path='/courses' element={<Courses/>}/>
     <Route path='/teachers' element={<Teachers/>}/>
     <Route path='/contact' element={<Contact/>}/>
     <Route path="/reset-password/:token" element={<ResetPassword />} />
     <Route path="/admin" element={<Admin/>}/>
    </Routes>
     <Footer/>
   </Router>
  );
}

export default App;
