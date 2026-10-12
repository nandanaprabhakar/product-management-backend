const mongoose = require('mongoose');

mongoose.connect(process.env.DBconnectionString).then(res =>{
    console.log("Mongodb Connected..."); 
})
.catch(err =>{
    console.log("Mongodb Connection error" +err);    
})
