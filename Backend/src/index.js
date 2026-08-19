require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const cors = require("cors");



connectDB();


const app = express();
app.use(express.json());
app.use(cookieParser());


const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://portfolio-sunnyrais-projects.vercel.app'
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
        return callback(null, true);
      }
      return callback(new Error('CORS Error: Origin not allowed'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
  })
);


const projectRoutes = require('./routes/projectRoutes');
const codingProfileRoutes = require('./routes/codingProfileRoutes');
const experienceRoutes = require('./routes/experienceRoutes')
const sociallinkRoutes = require('./routes/socialLinkRoutes')
const generalinfoRoutes = require('./routes/generalPRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api', authRoutes);
app.use('/api', projectRoutes);
app.use('/api', codingProfileRoutes);
app.use('/api', experienceRoutes);
app.use('/api', sociallinkRoutes)
app.use('/api', generalinfoRoutes);

const Port = process.env.PORT;
app.listen(Port, () => {
    console.log("Server Running on Port : ", Port);
})



