require("dotenv").config();
const express = require("express");
const { connectMongoDb } = require("./connection");
const cookieParser = require('cookie-parser')
const cors = require('cors');
const userRoute = require('./routes/user')
const questionRoute = require('./routes/question');
const { restrictToLoggedinUser } = require("./middlewares/auth");
const chatRoute = require('./routes/chat')

const app = express();
const port = 2001;

const corsOptions = {
  origin: process.env.MODE=='development'?process.env.FRONTEND_URL_DEV:process.env.FRONTEND_URL_PRODUCTION,
  credentials: true,              
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

//Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

//Database connection
connectMongoDb(process.env.MODE=='development'?process.env.MONGO_URI_DEV:process.env.MONGO_URI_PRODUCTION)
  .then(() => console.log("Mongo connected"))
  .catch((err) => console.error(err));


app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Routes 
app.use('/api/user', userRoute)
app.use('/api/questions', restrictToLoggedinUser, questionRoute)
app.use('/api/chat', chatRoute)
app.listen(port, () => {
  console.log("Server is running at http://localhost:" + port);
});
