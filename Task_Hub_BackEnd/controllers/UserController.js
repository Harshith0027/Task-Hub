import User from '../models/User.js';
import {config} from 'dotenv';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

config()
const { JWT_SECRET_SIGN } = process.env;
export const createUser = async (req, res)=>{
    const errors = validationResult(req);
    // bad error request 
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try{ 
        let user = await User.findOne({email: req.body.email});
        // if user already exists
        if(user){
            return res.status(400).json({message : "An User with same email already exists"});
        }
        {/*const salt = await bcrypt.genSalt(10);*/}
        const securePassword = await bcrypt.hashSync(req.body.password, 10);
        user = await User.create({
            name : req.body.name,
            email : req.body.email,
            password : securePassword
        });
        
        const data = {
            user: user.id
        }
        const authToken = jwt.sign(data,JWT_SECRET_SIGN,{expiresIn : '24h'});
        console.log(`Login details of user named ${req.body.name} are succesfully stored in the mongoDB and token is also generated.`);
        return res.json({authToken: authToken, userId: data.user});
        
    }
    catch(err){
        console.error(err.message);
        return res.status(500).send("some error occured");
    }
};

export const loginUser = async (req, res)=>{
    const errors = validationResult(req);
    // bad error request 
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {email,password} = req.body;
    try{
        // here user is used as a temp obj for mongo
        let user = await User.findOne({email : email});
        // if user already exists
        if(!user){
            throw new Error("Please try to login with correct credentials")
            //return res.status(400).json({error : "Please try to login with correct credentials"});
        }
        const passwordCompare = await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            throw new Error("Please try to login with correct credentials")
            //return res.status(400).json({error : "Please try to login with correct credentials"});
        }
        const data = {
            user: user.id
        }
        const authToken = jwt.sign(data,JWT_SECRET_SIGN,{expiresIn : '24h'});
        return res.json({authToken: authToken, name : user.name, userId : user.id});
    }
    catch(err){
        //console.log("hello")
        console.error(err.message);
        //throw err;
        return res.status(500).send("Some Internal Error Occured");
    }
};

export const getUser = async (req, res) => {
    try {
        const userId = req.user;
        if(!userId){
            return res.status(401).send({error: "authenticate using proper token"});
        }
        const user = await User.findById(userId).select("-password");
        console.log("Token verified succesfully.");
        return res.send(user);
    }
    catch(err){
        console.error(err.message);
        return res.status(401).send("Some Internal Error Occured");
    }
};