import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import About from './Components/About/About';
import Courses from './Components/Courses/Courses';
import Teachers from './Components/Teachers/Teachers';
import Contact from './Components/Contact/Contact';


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
    </Routes>
     <Footer/>
   </Router>
  );
}

export default App;
