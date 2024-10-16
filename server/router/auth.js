const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

require('../db/conn');
const User=require("../model/userSchema"); 

router.get('/',(req,res)=>{
    res.send('Hello World from sevrer router.js');
});

router.post('/Signup', async (req,res)=>{
    const {email, password, cpassword}=req.body;
    console.log(email);
    // console.log(req.body);
    // res.json({message:req.body});
    // res.send("regster page");
    if (!email || !password || !cpassword){
        return res.status(422).json({error: "fill the fields properly"});
    }

    try{
        const userExist = await User.findOne({email:email})

        if(userExist){
            return res.status(422).json({error: "email already exist"});
        }else if(password!=cpassword){
            return res.status(422).json({error: "password and confirm password should be same"});
        }else{
            const user=new User({email, password, cpassword});

        // hash pwd or smtg to protect pwds

            await user.save();

            res.status(201).json({ message: "user registered successfully"});
        }
  
    }catch(err){
        console.log(err);
    }
    
});

// login route
router.post('/Login',async (req,res)=>{
  try{
    let token;
    const{email, password} = req.body;

    if (!email || !password ){
        return res.status(400).json({error: "fill all the fields "});
    }

    const userLogin = await User.findOne({email:email});

    // console.log(userLogin);
    if(userLogin){
        const isMatch = await bcrypt.compare(password, userLogin.password);
     
        token = await userLogin.generateAuthToken();
        console.log(token);

        res.cookie("jwtoken", token,{
            expires: new Date(Date.now() + 25892000000),
            httpOnly:true
        });

    if(!isMatch){
        res.status(400).json({error:"Invalid Credentials "});
    }else{
        res.json({message:"user signin successfully"});
    }
    }else{
        res.status(400).json({error:"Invalid Credentials "});
    }

  }catch(err){
    console.log(err);
  }
});

module.exports = router;