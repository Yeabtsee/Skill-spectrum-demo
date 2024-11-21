import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import dotenv from 'dotenv';
import userRoutes from './Routes/userRoutes.js';
import coursesRoute from './Routes/courses.js';
import testimonialsRoute from './Routes/testimonials.js';
import db from './config/db.js';
import contactsRoute from './Routes/contact.js';
import resetRoute from './Routes/resetPassword.js';
import TokenRoutes from './Routes/password.js'
import exerciseRoute from './Routes/exercise.js';
import uploadsRoute from './Routes/uploads.js';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
// Convert import.meta.url to a __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'uploads/exercises' directory
app.use('/uploads/exercises', express.static(path.join(__dirname, 'uploads/exercises')));


app.use('/api/users', userRoutes);
app.use('/api/courses', coursesRoute);
app.use('/api/testimonials', testimonialsRoute);
app.use('/api/contacts', contactsRoute);
app.use('/api/forgot-password', resetRoute);
app.use('/api/reset-password', TokenRoutes)
app.use('/api/exercise', exerciseRoute)
app.use('/api/admin',uploadsRoute)

app.use(express.static(path.join(__dirname,'/frontend/build')))

app.get('*',(req,res) => res.sendFile(path.join(__dirname,'/frontend/build/index.html')))


const PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.send('Skill Spectrum API is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});