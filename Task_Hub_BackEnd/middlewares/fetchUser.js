import jwt from 'jsonwebtoken';
import {config} from 'dotenv';

config()
const { JWT_SECRET_SIGN } = process.env;
export const fetchUser = (req, res, next)=> {
    //console.log(JWT_SECRET_SIGN);
    const token = req.header("auth-token");
    //console.log(token)
    if (!token){ 
        return res.status(401).send("Access Denied");
    }
    try {
        //console.log(token);
        //console.log(JWT_SECRET_SIGN);
        const data = jwt.verify(token,JWT_SECRET_SIGN);
        //console.log("middleware",data);
        // user is used as word because in creation and login we have used user for finding, checking and assigning the values and id's.
        req.user = data.user;
        //console.log(req.user);
        next();
    }
    catch(error){
        //console.log("outside");
        res.status(400).send(error.message);
    }
};