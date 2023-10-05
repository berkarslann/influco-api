
const path = require('path');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const Influencer = require('../models/influencer')
const ErrorResponse = require('../utils/errorResponse');

module.exports = async (req,res,next)=>{
    let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
    // Set token from cookie
  }
try{
    const decoded = jwt.verify(token, 'somesupersecretsecret');

    console.log(req.influencerId)
    console.log(decoded.userId)
    const a = await Influencer.findById(decoded.userId)
  
    console.log(a)
    if(!req.user){
       return next(
            new ErrorResponse(
            "HATA",
              403
            )
          );
    }
    next()
}
catch(err){
    console.log(err)
}
    
}