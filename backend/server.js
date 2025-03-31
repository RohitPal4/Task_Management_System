const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const UserAPI = require('./routes/user.js');
const taskAPI = require('./routes/task.js');

const app = express();
dotenv.config();

require('./conn/conn.js'); 


app.use(cors());
app.use(cors({
    origin: ["https://task-management-7lpfbwo82-rohit-pals-projects.vercel.app"], 
    credentials: true
  }));
app.use(express.json());


app.use('/api/v1', UserAPI);
app.use('/api/v2', taskAPI);




app.get('/', (req, res) => {
    res.send("Hello from server");
});

const PORT = 1000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


