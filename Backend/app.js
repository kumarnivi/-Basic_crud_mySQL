
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes/authRoute');


const app = express();

// Use only express.json() for parsing JSON
app.use(express.json());

const allowedOrigins = ['http://localhost:8080'];
app.use(cors({
  origin: allowedOrigins
}));




// app.use(cors());
app.use('/api',  router)

// connet the server which using port
app.listen(8080, function (error) {
    if (error) {
        console.log('Error:', error);
    } else {
        console.log("Server started on port 8080");
    }
  });


