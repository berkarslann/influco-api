const path = require('path');

const User = require('../models/user');
const Influencer = require('../models/influencer');
const Brand = require('../models/brand');
const Serie = require('../models/serie');


// @desc      Get all imfluencers
// @route     GET /influencers
// @access    Public
exports.getInfluencers = async (req,res,next)=>{
    try{
       const influencer = await Influencer.find();

       res.status(200).json({ success: true, data: influencer });

    }
    catch(err){
        console.log(err)
        next(err);
    }
}

// @desc      Get a single imfluencers
// @route     GET /influencer/:id
// @access    Public
exports.getSingleInfluencer = async (req,res,next) => {
    try {
        const influencer = await Influencer.findById(req.params.id);

  if (!influencer) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: influencer });
    }
    catch(err){
        console.log(err);
        res.status(401).json({
            message: 'valid'
        })
    }
}

// @desc      Get all brands
// @route     GET /brands
// @access    Public
exports.getBrands = async (req,res,next)=>{
    try{
       const brand = await Brand.find();

       res.status(200).json({ success: true, data: brand });

    }
    catch(err){
        console.log(err)
        next(err);
    }
}

// @desc      Get a single brand
// @route     GET /feed/brand/:id
// @access    Public
exports.getSingleBrand = async (req,res,next) => {
    try {
        const brand = await Brand.findById(req.params.id.trim());

  if (!brand) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: brand });
    }
    catch(err){
        console.log(err);
        res.status(401).json({
            message: 'valid'
        })
    }
}


// @desc      Follow an influencer as an user
// @route     POST /feed/influencer/:id
exports.postFollow = async(req,res,next)=>{

    try{
       
        req.body.user = req.userId
      
        const influencer = await Influencer.findById(req.params.id);
        const user = await User.findById(req.userId)
        console.log(influencer.followers.includes(user) ) 
        if(influencer.followers.includes(req.userId) === false){
            influencer.followers.push(user)
            res.status(200).json({ message: "Takip edildi" });
        }else{
           influencer.followers.pull(user)
         
           res.status(200).json({ message: "Takipten çıkıldı" });
        }
            //Counting Impact rate
            const totalUser = await User.countDocuments()
            const selfRate = influencer.followers.length
            const tutar = (selfRate * 100) / totalUser
            console.log(tutar) 
            influencer.impactRate = tutar;
        await influencer.save()
        await user.save();
        
    }
    catch(err){
        console.log(err);
    }

 
}

// @desc      Follow an influencer as an user
// @route     POST /feed/serie/:id
exports.postSubsSerie = async(req,res,next)=>{

    try{
       
        req.body.user = req.userId
      
        const serie = await Serie.findById(req.params.id);
        const user = await User.findById(req.userId)
        
        if(user.wallet>=serie.price){

            user.subseries.push(serie);
            serie.members.push(user)
            await serie.save()
            await user.save();
            res.status(200).json({ success: true });
        }else{
            res.status(200).json({ message: 'Yetersiz bakiye' });
        }
        

       

    }catch(err){
        console.log(err);
    }

 
}


