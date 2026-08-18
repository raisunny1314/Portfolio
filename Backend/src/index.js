require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const cors = require("cors");



connectDB();


const app = express();
app.use(express.json());
app.use(cookieParser());


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));



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



