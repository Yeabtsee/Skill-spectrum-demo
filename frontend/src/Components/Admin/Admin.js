import React, {useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import '../../Assets/css/admin.css'

 const Admin = () => {
    const [users, setUsers] = useState([]);
    const [courses, setCourses] = useState([]);
    const [newCourse, setNewCourse] = useState({ name: '', description: '', imagePath: '' });
    const [contacts, setContacts] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);

    const adminUsers = ["YEAB", "JOSI", "ABEL"];
    const storedUsername = localStorage.getItem('username');
   
    const navigate = useNavigate();
    useEffect(() => {
      if (!adminUsers.includes(storedUsername) ) {
       navigate('/')
      }
    }, []);
  
    useEffect(() => {
      // Fetch users and courses
      axios.get('/api/users')
      .then(response => {
        
        const usersData = response.data.users;
        setUsers(Array.isArray(usersData) ? usersData : Object.values(usersData)); // Convert object to array if necessary
       
      })
      .catch(error => {
        console.error("Error fetching users:", error);
      });

      axios.get('/api/courses')
      .then(response => {
        const courseData = response.data.courses;
        setCourses(Array.isArray(courseData) ? courseData : Object.values(courseData)); // Convert object to array if necessary
       
      })
      .catch(error => {
        console.error("Error fetching courses:", error);
      });

      axios.get('/api/contacts')
      .then(response => {
        
        const contactData = response.data.contacts;
        console.log(contactData)
        setContacts(Array.isArray(contactData) ? contactData : Object.values(contactData)); // Convert object to array if necessary
       
      })
      .catch(error => {
        console.error("Error fetching contacts:", error);
      });
     
    }, []);
 
    useEffect(() => {
      const fetchSubmissions = async () => {
        try {
          const response = await fetch('/api/admin/uploads');
          if (!response.ok) throw new Error('Failed to fetch submissions');
          const data = await response.json();
          setSubmissions(data.uploads);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchSubmissions();
    }, []);

    if (loading) {
      return <p>Loading submissions...</p>;
    }
  


const handlePrint = (course) => {
  // Find the specific table element by course name
  const tableElement = document.getElementById(`table-${course}`);
  
  if (tableElement) {
    html2canvas(tableElement).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Calculate image dimensions to fit the PDF page
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${course}_users.pdf`);
    });
  } else {
    alert("Table not found");
  }
};

const handlePrintExcel = (course) => {
  const tableElement = document.getElementById(`table-${course}`);

  if (tableElement) {
    const workbook = XLSX.utils.table_to_book(tableElement);
    XLSX.writeFile(workbook, `${course}_users.xlsx`);
  } else {
    alert("Table not found");
  }
};
    const handleAddCourse = (e) => {
      e.preventDefault();
      axios.post('/api/courses', newCourse)
        .then((res) => {
          setCourses([...courses, newCourse]);
          setNewCourse({ name: '', description: '', imagePath: '' }); // Clear the form
          alert(res.data.message);
        })
        .catch((err) => alert('Error adding course: ' + err));
    };


      return (
        <div className="admin-container">
        <h1>Admin Page</h1>
        
        {courses.map(course => (
            <div key={course.course_name} className="course-section">
              <h2>Course: {course.course_name}</h2>
              <table id={`table-${course.course_name}`} className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Full Name</th>
                    <th>University ID</th>
                    <th>Username</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {users
                    .filter(user => user.course === course.course_name)
                    .map(user => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.fullName}</td>
                        <td>{user.Uni_id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <button onClick={() => handlePrint(course.course_name)} className="print-button">
                Print to PDF
              </button>
              <button onClick={() => handlePrintExcel(course.course_name)} className="print-button-excel">
                Print to Excel
              </button>
            </div>
          ))}

<div className="">
      <h2>Exercise Submissions</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Student</th>
            <th>Course</th>
            <th>Description</th>
            <th>File</th>
            <th>Submitted At</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission) => (
            <tr key={submission.id}>
              <td>{submission.id}</td>
              <td>{submission.student}</td>
              <td>{submission.course}</td>
              <td>{submission.description}</td>
              <td>
                <a href={`/uploads/exercises/${submission.file_name}`} target="_blank" rel="noopener noreferrer">
                  Download
                </a>
              </td>
              <td>{new Date(submission.submitted_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

        <form onSubmit={handleAddCourse} className="add-course-form">
          <h2>Add new course</h2>
          <label>
            Course Name:
            <input
              type="text"
              value={newCourse.name}
              onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
              required
            />
          </label>
          <label>
            Course Description:
            <input
              type="text"
              value={newCourse.description}
              onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
              required
            />
          </label>
          <label>
            Image Path:
            <input
              type="text"
              value={newCourse.imagePath}
              onChange={(e) => setNewCourse({ ...newCourse, imagePath: e.target.value })}
              required
            />
          </label>
          <button type="submit">Add Course</button>
        </form>
         <br/>
         <br/>   


        <h2 className='title'>Contacts Table</h2>
        <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Message</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts
                    .map(contact => (
                      <tr key={contact.id}>
                        <td>{contact.id}</td>
                        <td>{contact.name}</td>
                        <td>{contact.email}</td>
                        <td>{contact.subject}</td>
                        <td>{contact.message}</td>
                        <td>{contact.created_at}</td>
                      </tr>
                    ))}
                </tbody>
              </table>


    </div>

      );
  };
  export default Admin;