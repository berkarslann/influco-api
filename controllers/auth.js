const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


const User = require('../models/user');
const Influencer = require('../models/influencer')
const Brand = require('../models/brand');


// @desc      Create user (user,influencer,brand)
// @route     POST /auth/signup
exports.signup = async (req,res,next) => {

    try{
      //Save user as whatever person choose
        const { userType, username, email, password, wallet} = req.body;
        console.log(req.body)
        const hashedPw = await bcrypt.hash(password, 12)
        console.log(hashedPw)
        let newUser;
    if (userType === 'user') {
      newUser = new User({ username, email, password:hashedPw , wallet});
    } else if (userType === 'influencer') {
      newUser = new Influencer({ username, email, password:hashedPw });
    } else if (userType === 'brand') {
      newUser = new Brand({ username, email, password:hashedPw });
    } else {
      return res.status(400).json({ message: 'Invalid user type' });
    }


    await newUser.save();

    res.status(201).json({ message: 'User saved succesfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error at saving user' });
    next(err)
  }
 }

// @desc      Login user (user,influencer,brand)
// @route     POST /auth/login
exports.login = async (req,res,next)=>{

    try{

      const email = req.body.email;
      const password = req.body.password;
      const userType= req.body.userType //giriş ekranında sorulabilir
      if (userType === 'user') {
        const user = await User.findOne({email: email})
        const isEqual = await bcrypt.compare(password, user.password);

          if (!isEqual) {
           const error = new Error('Yanlış şifre!');
          error.statusCode = 401;
          throw error;
          }
          const token = jwt.sign(
            {
              email: user.email,
              userId: user._id.toString()
            },
            'somesupersecretsecret',
            { expiresIn: '1h' }
          );
          res.cookie('token', token)
          .json({
            success:true,
            token
          })
          res.status(200).json({ message:'success' });
      } else if (userType === 'influencer') {
        const influencer = await Influencer.findOne({email: email})
        const isEqual = await bcrypt.compare(password, influencer.password);

           if (!isEqual) {
           const error = new Error('Yanlış şifre!');
           error.statusCode = 401;
           throw error;
           }
           const token = jwt.sign(
            {
              email: influencer.email,
              userId: influencer._id.toString()
            },
            'somesupersecretsecret',
            { expiresIn: '1h' }
          );
          res.cookie('token', token)
          .json({
            success:true,
            token
          })
          res.status(200).json({ message:success});
      } else if (userType === 'brand') {
        const brand = await Brand.findOne({email: email});
        const isEqual = await bcrypt.compare(password, brand.password);

           if (!isEqual) {
           const error = new Error('Yanlış şifre!');
           error.statusCode = 401;
           throw error;
           }
           const token = jwt.sign(
            {
              email: brand.email,
              userId: brand._id.toString()
            },
            'somesupersecretsecret',
            { expiresIn: '1h' }
          );
          res.cookie('token', token)
          .json({
            success:true,
            token
          })
          res.status(200).json({ token: token, userId: brand._id.toString() });
      } else {
        return res.status(400).json({ message: 'Invalid user type' });
      }
  
    }
    catch(err){
      next(err);
    }

}


// @desc      Logout user (user,influencer,brand)
// @route     GET /auth/login
exports.logout = async (req, res, next) => {

  try{
    res.cookie('token', 'none', {
      expires: new Date(Date.now())
    });

    res.status(200).json({
      success: true,
      data: {}
    });
  }
  catch(err){
    console.log(err)
  }
  
};



