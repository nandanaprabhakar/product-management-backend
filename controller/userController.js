const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
exports.register = async(req, res) =>{
    console.log('Inside user register');
    const { username, email, password } =req.body;
    try{
        const exitingUser = await User.findOne({email});
        if(exitingUser){
            res.status(402).json('User already exist...');
        }
        else{
            const newUser = new User({ username, email, password });
            await newUser.save();
            res.status(200).json({ message: 'Register successfully...', newUser });
        }
    }
    catch(err){
        res.status(500).json(err);
    }
}

exports.login = async(req, res) =>{
    console.log('Inside user login');
    const { email, password } = req.body;
    try{
       const user = await User.findOne({email});
       if(user){
       if(user.password == password){
        const token = jwt.sign({email: email}, process.env.jwtKey);
        console.log(token);   
       res.status(200).json({ message: 'Login Successfully...', token, user });
       }
       else{
        res.status(401).json('Password mismatch!');
       }
    }
    else{
        res.status(404).json('User not found!');
    }
    } 
    catch(err){
       res.status(500).json(err); 
         console.error('Login error:', err);

       
    }
}

