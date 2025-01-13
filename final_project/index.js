const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;
const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
//Write the authenication mechanism here
    const token =req.session.token;
    if(!token){
        return res.status(400).json({message:"no session token"})
    }
    });

    try{
        const  decoded=jwt.verify(token,JWT_JWT_SECRET);
        req.user=decoded;
    next();
    }catch(err){
        return res.status(400).json({message:"Invid token"});
    }


const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);
app.use("./router/general.js",public_users)

app.listen(PORT,()=>console.log("Server is running"));