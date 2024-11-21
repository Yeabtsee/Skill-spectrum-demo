import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Videos from './Videos.js';
import '../../Assets/css/materials.css'; 

const Materials = () => {
  const [courseName, setCourseName] = useState("");
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [student, setFullName] = useState(""); // New state for full name
  const [responseMessage, setResponseMessage] = useState("");


  const navigate = useNavigate();
  useEffect(() => {
    const isLogin=localStorage.getItem('username')
    if (!isLogin) {
     navigate('/')
    }
  }, []);


  useEffect(() => {
    const username = localStorage.getItem('username');
    const url = '/api/users/mycourse'; 
    const data = { user: username }; 

    fetch(url,{
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setCourseName(data[0].course);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file) {
      setResponseMessage("Please upload a file!");
      return;
    }

    const formData = new FormData();
    formData.append("File", file);
    formData.append("description", description);
    formData.append("courseName", courseName);
    formData.append("student", student);

    fetch("/api/exercise/submit", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setResponseMessage(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setResponseMessage("An error occurred while submitting.");
      });
  };

  // Next class date calculation
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  let daysUntilNextTuesday = (2 - currentDay + 7) % 7;
  let daysUntilNextMonday = (1 - currentDay + 7) % 7;

  if (daysUntilNextTuesday === 0) {
    daysUntilNextTuesday = 7;
  }
  if (daysUntilNextMonday === 0) {
    daysUntilNextMonday = 7;
  }
  const nextMonday = new Date(currentDate);
  const nextTuesday = new Date(currentDate);
  nextMonday.setDate(currentDate.getDate() + daysUntilNextMonday);
  nextTuesday.setDate(currentDate.getDate() + daysUntilNextTuesday);
  const formattedDate2 = nextMonday.toLocaleDateString();
  const formattedDate = nextTuesday.toLocaleDateString();




  return (
    <div className="materials-container">
      <h1>{courseName}</h1>
      {courseName === 'Video Editing' ? (
        <>
          <h3>Introduction to Adobe Premiere Pro</h3>
          <p class="feature-list">
            <span class="feature-title">Adobe Premiere Pro Overview:</span><br/>
            <div class="feature">
                <span class="feature-number">1.</span> <span class="feature-text">Advanced Video Editing Tools - Provides comprehensive tools for cutting, arranging, and adjusting clips with precision.</span>
            </div>
            <div class="feature">
                <span class="feature-number">2.</span> <span class="feature-text">High-Quality Output - Supports up to 8K resolution and numerous export options for various file formats.</span>
            </div>
            <div class="feature">
                <span class="feature-number">3.</span> <span class="feature-text">Visual Effects and Transitions - Includes built-in transitions, filters, and effects to enhance content.</span>
            </div>
            <div class="feature">
                <span class="feature-number">4.</span> <span class="feature-text">Multicam Editing - Simplifies editing from multiple camera angles for professional shoots.</span>
            </div>
            <div class="feature">
                <span class="feature-number">5.</span> <span class="feature-text">Integration with Adobe Suite - Works seamlessly with After Effects, Photoshop, and Audition.</span>
            </div>
            <div class="feature">
                <span class="feature-number">6.</span> <span class="feature-text">Collaborative Features - Allows team collaboration with Adobe's Creative Cloud.</span>
            </div>
            <div class="feature">
                <span class="feature-number">7.</span> <span class="feature-text">Customizable Interface - Provides a customizable interface for efficient workflow.</span>
            </div>
            <br/>
            <div class="feature">
                <span class="feature-ideal">Ideal For: </span> Adobe Premiere Pro is suitable for beginners to professionals due to its user-friendly design and powerful features. 
            </div>
        </p>

          <h2>Course Materials</h2>
          <div className="video-container">
            <Videos videoId="fgH-aw7tkng" videoTitle="Adobe Premiere Pro Tutorial: For Beginners" />
            <Videos videoId="yO52Tx60Keg" videoTitle="Premiere Pro Tutorial for Beginners 2024" />
            <Videos videoId="8eDsvKwM40U" videoTitle="Learn Adobe Premiere Pro from Start to Finish" />
            <Videos videoId='CNfUW8h8RUw' videoTitle='Adobe Premiere pro Beginner course | Amharic '/>
            <Videos videoId='eCsM0r3RNc4' videoTitle='Premiere Pro Full Course Tutorial (6+ Hours) ' />
            <Videos videoId='1-sNJs-MFYo' videoTitle='Learn EVERYTHING about Premiere Pro  ' />
          </div>

          <h2>Class Powerpoints</h2>
          <ul className="materials-list">   
            <li><a href="files/Video_Editing/Course_Outline.pdf" download="Course_Outline.pdf">Download Course outline</a></li>
            <li><a href="files/Video_Editing/video_ppt.pdf" download="Video_editing.pdf">Download Video Editing Powerpoint</a></li>
          </ul>

          <h2>Other Resources</h2>
          <ul className="materials-list">   
            <li><a href="files/Video_Editing/Intro_to_Adobe_Premiere_Pro.pdf" download="Intro_to_Adobe_Premiere_Pro.pdf">Download Intro to Adobe Premiere Pro</a></li>
            <li><a href="files/Video_Editing/PremiereProTutorial.pdf" download="Premiere_Pro_Tutorial.pdf">Download Premiere Pro Tutorial</a></li>
          </ul>

          <div className="class-schedule">
            <h4>Next Class: Tuesday, {formattedDate}</h4>
          </div>
        </>
      ) : (
        <>
        <h3>Introduction to Python</h3>
        <p class="feature-list">
            <span class="feature-title">Python Programming Overview:</span><br/>
            
            <div class="feature">
                <span class="feature-number">1.</span> <span class="feature-text">Simple and Readable Syntax - Python is designed to be easy to read and write, making it beginner-friendly and ideal for rapid development.</span>
            </div>
            
            <div class="feature">
                <span class="feature-number">2.</span> <span class="feature-text">Wide Range of Libraries - Python has a large ecosystem of libraries, such as NumPy, pandas, and Matplotlib, which simplify data analysis, visualization, and scientific computing.</span>
            </div>
            
            <div class="feature">
                <span class="feature-number">3.</span> <span class="feature-text">Versatile Applications - From web development (Django, Flask) to machine learning (scikit-learn, TensorFlow), Python is used across various domains and industries.</span>
            </div>
            
            <div class="feature">
                <span class="feature-number">4.</span> <span class="feature-text">Strong Community Support - With a vast global community, Python has extensive documentation, tutorials, and forums that support learning and troubleshooting.</span>
            </div>
            
            <div class="feature">
                <span class="feature-number">5.</span> <span class="feature-text">Cross-Platform Compatibility - Python runs on multiple platforms (Windows, macOS, Linux), ensuring ease of deployment across different systems.</span>
            </div>
            
            <div class="feature">
                <span class="feature-number">6.</span> <span class="feature-text">Interpreted Language - Python code is executed line by line, which makes debugging simpler and promotes faster iteration during development.</span>
            </div>
            
            <div class="feature">
                <span class="feature-number">7.</span> <span class="feature-text">Object-Oriented and Functional - Supports both object-oriented and functional programming paradigms, offering flexibility in coding styles.</span>
            </div>
            
            <br/>
            
            <div class="feature">
                <span class="feature-ideal">Ideal For :</span> Python is suitable for both beginners and experienced developers, and is commonly used in web development, data science and artificial intelligence.
            </div>
        </p>

        <h2>Course Materials</h2>
          <div className="video-container">
            <Videos videoId='xkZMUX_oQX4' videoTitle='Python - Introduction - W3Schools.com '/>
            <Videos videoId="kqtD5dpn9C8" videoTitle="Python for Beginners - Learn Python in 1 Hour" />
            <Videos videoId="eWRfhZUzrAc" videoTitle="Python for Beginners – Full Course" />
            <Videos videoId="b093aqAZiPU" videoTitle="Python for Beginners Tutorial" />
            <Videos videoId='vFvfCxZwMkk' videoTitle='Python in Amharic: Day 1 ' />
            <Videos videoId='_uQrJ0TkZlc' videoTitle='Python Full Course for Beginners  ' />
          </div>
     
          <h2>Class Powerpoints</h2>
          <ul className="materials-list">   
            <li><a href="/files/Python/Python.pptx" download="Python_CH1.pptx">Download Python Chapter 1</a></li>
            <li><a href="files/Python/Python2.pptx" download="Python_CH2.pptx">Download Python Chapter 2</a></li>
            <li><a href="files/Python/Python3.pptx" download="Python_CH3.pptx">Download Python Chapter 3</a></li>
            <li><a href="files/Python/Python4.pptx" download="Python_CH4.pptx">Download Python Chapter 4</a></li>
            <li><a href="files/Python/Final_Project.pdf" download="Previous_Project.pdf">Download Previous Projects</a></li>
          </ul>

          <h2>Useful Links</h2>
          <ul className="materials-list">   
            <li><a href="https://www.python.org/downloads" target='_blank'>Download Python</a></li>
            <li><a href="https://code.visualstudio.com/download" target='_blank'>Download Visual Studio Code</a></li>
          </ul>

           {/* Exercise submission form */}
      
      <h1 className='title'>Submit Your Exercise</h1>
      <form className='exForm' onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <label>
          Full Name:
          <input
            type="text"
            name="student"
            value={student}
            onChange={(e) => setFullName(e.target.value)}
            required
            placeholder="Enter your full name"
          />
        </label>
        <br />
        <label>
          Upload Exercise:
          <input
            type="file"
            name="File"
            onChange={handleFileChange}
            required
          />
        </label>
        <br />
        <label>
          Description (optional):
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            placeholder="Add any comments about your submission..."
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      
      {responseMessage && <p className='res'>{responseMessage}</p>}
      </form>

          <div className="class-schedule">
            <h4>Next Class: Monday, {formattedDate2}</h4>
          </div>
    </>
    )}
    </div>
  );
};

export default Materials;
