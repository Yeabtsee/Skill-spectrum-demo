import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // Set the maximum number of connections
  queueLimit: 0
});

// Create tables if they don't exist
const createTables = () => {
  const createTablesQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      course VARCHAR(255)
    );

    CREATE TABLE IF NOT EXISTS testimonials (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      testimonial TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS contacts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      subject VARCHAR(255),
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS courses (
      id INT AUTO_INCREMENT PRIMARY KEY,
      course_name VARCHAR(255) NOT NULL,
      course_description TEXT NOT NULL,
      image_path VARCHAR(255)
    );
  `;

  pool.query(createTablesQuery, (err) => {
    if (err) {
      console.error('Error creating tables:', err);
      return;
    }
    console.log('Tables are ready');
    populateCourses();
  });
};

// Populate the courses table if it is empty
const populateCourses = () => {
  const insertCoursesQuery = `
    INSERT INTO courses (id, course_name, course_description, image_path)
    VALUES 
      (1, 'Computer Programming (Python)', 'Step into the world of programming with Python, one of the most versatile and beginner-friendly languages. This course covers everything from the basics of syntax and variables to more advanced topics like data structures, object-oriented programming, and web development. Whether you\'re new to coding or looking to sharpen your Python skills, you\'ll learn how to build real-world applications, automate tasks, and solve complex problems efficiently. Perfect for aspiring developers and tech enthusiasts eager to make their mark in the world of software development.', 'images/python_2.jpg'),
      (2, 'Graphic Design', 'Unleash your creativity with our Graphic Design course! Learn how to create visually appealing content using industry-standard tools like Adobe Photoshop and Illustrator. This course dives deep into design principles, color theory, typography, and layout techniques to help you create logos, posters, social media graphics, and more. Whether you\'re just starting out or seeking to refine your design skills, this course provides hands-on projects and expert guidance to help you build a strong design portfolio.', 'images/graphics.jpg'),
      (3, 'Video Editing', 'Bring stories to life through video editing! This course introduces you to the art of video production, from cutting and arranging footage to adding transitions, effects, and soundtracks. You\'ll work with professional software like Adobe Premiere Pro or Final Cut Pro, mastering the skills needed to create polished content for YouTube, social media, or even short films. Perfect for aspiring filmmakers, content creators, and anyone passionate about video storytelling.', 'images/video.jpg')
    ON DUPLICATE KEY UPDATE course_name=course_name;
  `;

  pool.query(insertCoursesQuery, (err) => {
    if (err) {
      console.error('Error populating courses table:', err);
      return;
    }
    console.log('Courses table populated with initial data');
  });
};

// Initialize the database setup
createTables();

export default pool;
