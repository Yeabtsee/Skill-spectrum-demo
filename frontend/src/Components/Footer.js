import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../Assets/css/footer.css';
import axios from 'axios';


const Footer = () => {

  const [testimonial, setTestimonial] = useState('');
  const [courses, setCourses] = useState([]);
 
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth', 
      });
    };

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch('/api/courses');
      const data = await response.json();
      setCourses(data);
    };

    fetchCourses();
  }, []);
    

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const token = localStorage.getItem('token'); // Check if the user is logged in
      const username = localStorage.getItem('username');

      if (!token) {
        alert('Please log in to submit a testimonial.');
        return; // Exit the function if not logged in
      }
  
      try {
        const response = await axios.post('/api/testimonials', {
         username,
          testimonial,
        }, {
          headers: {
            'Authorization': `Bearer ${token}`, // Add token to the request headers if necessary
          },
        });
        
        // Clear the testimonial input after submission
        setTestimonial('');
        alert('Testimonial submitted successfully!');
      } catch (error) {
        console.error('Error submitting testimonial:', error);
        alert('There was an error submitting your testimonial. Please try again later.');
      }
    };

  return (
    <>
    <div className="container-fluid bg-dark text-white py-5 px-sm-3 px-lg-5" style={{ marginTop: '90px' }}>
      <div className="row pt-5">
        {/* Get In Touch Section */}
        <div className="col-lg-7 col-md-12">
          <div className="row">
            <div className="info-ctn col-md-6 mb-5">
              <h5 className="text-primary text-uppercase mb-4" style={{ letterSpacing: '5px' }}>Get In Touch</h5>
              <p><i className="fa fa-map-marker-alt mr-2"></i>Kilinto, Addis Ababa, Ethiopia</p>
              <p><i className="fa fa-phone-alt mr-2"></i>+251 984 790 858</p>
              <p><i className="fa fa-envelope mr-2"></i>skillspectrum23@gmail.com</p>
              <div className="social d-flex justify-content-start mt-4">
                <a className="tw btn btn-outline-light btn-square mr-2" href="https://t.me/skillspectrum23" target='blank'><i className="fab fa-telegram"></i></a>
                <a className="ig btn btn-outline-light btn-square mr-2" href="#"><i className="fab fa-instagram"></i></a>
                <a className="fb btn btn-outline-light btn-square mr-2" href="#"><i className="fab fa-facebook-f"></i></a>
                <a className="in btn btn-outline-light btn-square " href="#"><i className="fab fa-linkedin-in"></i></a>
              </div>
            </div>

            {/* Our Courses Section */}
            <div className="crs-links col-md-6 mb-5">
              <h5 className="text-primary text-uppercase mb-4" style={{ letterSpacing: '5px' }}>Our Courses</h5>
              <div className="d-flex flex-column justify-content-start">
                {courses.map(course => (
                  <Link
                    key={course.id}
                    className="text-white mb-2"
                    to={`/courses#${course.course_name.toLowerCase().replace(/ /g, '-')}`}
                  >
                    <i className="fa fa-angle-right mr-2"></i>
                    {course.course_name}
                  </Link>
           ))}
      </div>
    </div>
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="col-lg-5 col-md-12 mb-5">
      <h5 className="text-primary text-uppercase mb-4" style={{ letterSpacing: '5px',textAlign:'center' }}>Testimonial</h5>
      <h3 style={{color:"white", marginBottom:"10px"}}>Share your experience with us</h3>

      <div className="w-100">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              className="form-control border-light"
              style={{ padding: '30px' }}
              placeholder="Write here"
              value={testimonial}
              onChange={(e) => setTestimonial(e.target.value)}
            />
            <div className="input-group-append">
              <button className="btn btn-primary px-4" type="submit">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
      </div>
    </div>
     <a onClick={scrollToTop} className="btn btn-lg btn-primary btn-lg-square back-to-top" style={{ cursor: 'pointer' }}>
     <i className="fa fa-angle-double-up"></i>
   </a>
   </>
  );
};

export default Footer;
