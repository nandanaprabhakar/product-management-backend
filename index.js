require('dotenv').config();

const express = require('express');
const cors = require('cors');
require('./config/db');
const route = require('./routes/route');

const productServer = express();

productServer.use(cors());
productServer.use(express.json());
productServer.use(route);
productServer.use('/uploads', express.static('./uploads'));
const PORT = 3000 || process.env.PORT

productServer.get('/',(req,res) =>{
    res.send("Welcome to product serever");
})

productServer.listen(PORT, ()=>{
    console.log(`Product server running on port ${PORT}`);
})