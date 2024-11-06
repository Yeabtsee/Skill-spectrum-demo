import React,{useState,useEffect} from 'react';
import '../../Assets/css/courses.css';
import { useLocation } from 'react-router-dom'


const Body = () => {
  const [courses, setCourses] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (courses.length > 0 && location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [courses, location]);

  useEffect(() => {
    // Fetch courses from the backend
    const fetchCourses = async () => {
      try {
        const response = await fetch('/api/courses');
        const data = await response.json();
        setCourses(data.courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="course-list">
      {courses.map(course => (
        <div className="course-card" key={course.id} id={course.course_name.toLowerCase().replace(/ /g, '-')}>
          <img src={course.image_path} alt={course.course_name} className="course-image" />
          <div className="course-content">
            <h1>{course.course_name}</h1>
            <p>{course.course_description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Body;
