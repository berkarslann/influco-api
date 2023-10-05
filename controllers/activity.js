const fs = require('fs');
const path = require('path');

const Influencer = require('../models/influencer')
const Activity = require('../models/activity')

// @desc      Get activities 
// @route     GET /activity/
exports.getActivity = async(req,res,nex)=>{
    try{
        const currentPage = req.query.page || 1;
        const perPage = 2;
        let totalItems;
    
        // Docs count
        totalItems = await Activity.countDocuments();
        const activities = await Activity.find()
            .skip((currentPage-1)*perPage)
            .limit(perPage)
            res.status(200).json({
                message: 'Gönderiler başarıyla getirildi.',
                activities: activities,
                totalItems: totalItems
            })
    }
    catch(err){
        if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err)
    }



}


// @desc      Create activity (if it is an influencer)
// @route     POST /activity/
exports.postActivity = async(req,res,next)=>{
    try{
        
        req.body.influencer = req.userId; //influencer
       
        const {title, location, sponsor, shortDescription ,time} = req.body;

        const influencer = await Influencer.findById(req.body.influencer)
        console.log(influencer)

        const activity = new Activity({
            influencer: req.body.influencer,
            title: title,
            location: location,
            sponsor: sponsor,
            shortDescription: shortDescription,
            time: time
          
        })
         await activity.save();

    
        influencer.activities.push(activity);
        await influencer.save()

        res.status(201).json({
            message: 'Activity created successfully!'
        })

    }
    catch(err){
        console.log(err);
        next(err);
    }
   
}

// @desc      Delete activity 
// @route     DELETE /activity/:id
exports.deleteActivity = async(req,res,next)=>{

    try{
        
        const activityId = req.params.id;
        const activity = await Activity.findById(req.params.id);
   
        if (!activity) {
            return next(
                res.status(401).json({ success: false, message: "Aktivite bulunamadı" })
            );
          }
    
    const result = await Activity.findByIdAndRemove(activityId);
    const influencer = await Influencer.findById(req.userId);
    influencer.activities.pull(activityId);
    await influencer.save();

    res.status(200).json({ message: 'Deleted activity.' }); 
    
  
    }
    catch(err){
        next(err);
    }
   


}