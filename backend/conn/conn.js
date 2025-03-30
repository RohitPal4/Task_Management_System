const mongoose = require('mongoose');

const conn = async ()=>{
    try {
        const response = await mongoose.connect(process.env.DB_URL);
        if(response){
            console.log('connected to database');
        }
    } catch (err) {
        console.log('connection failed to connect to database',err)
    }
}
conn();