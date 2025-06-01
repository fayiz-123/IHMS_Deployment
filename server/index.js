const express = require('express')
const app = express()
app.use(express.json())
require('dotenv').config()
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URL)
const cookieParser = require('cookie-parser')
const cors = require('cors')

const allowedOrigins = [
  'http://localhost:5174',
  'https://ihms.vercel.app',
  'https://ihms-adminpanel.vercel.app'
];

app.use(cookieParser())

app.use(cors({
  origin: function (origin, callback) {
    console.log("Incoming origin:", origin);
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials:true
}));


const userRoutes = require('./routes/userRoutes')
const adminRoutes = require('./routes/adminRoutes')
const serviceRoutes = require('./routes/serviceRoutes')
const contactRoutes = require('./routes/contactRoutes')


app.get('/health',(req,res)=>{
    res.send('Server is healthy')
})


app.use('/', userRoutes)
app.use('/admin', adminRoutes)
app.use('/service', serviceRoutes)
app.use('/contact', contactRoutes)





app.listen(process.env.PORT, () => {
    console.log("Server is running on port 8000");
}) 