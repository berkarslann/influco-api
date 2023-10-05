
const Influencer = require('../models/influencer')
const Serie = require('../models/serie');

// @desc      Post serie 
// @route     POST/serie/
exports.postSerie = async(req,res,next)=>{

    try{

        req.body.influencer = req.userId; //influencer
        const { name, shortDescription, price, member, imageUrl, videoUrl} = req.body;

        const serie = new Serie({
            influencer: req.body.influencer,
            name: name,
            shortDescription: shortDescription,
            price:price,
            member: member,
            imageUrl: imageUrl,
            videoUrl: videoUrl

          
        });
        const influencer = await Influencer.findById(req.body.influencer)

        const savedSerie =  await serie.save();

    

        influencer.series.push(savedSerie);
        await influencer.save()

        res.status(201).json({
            message: 'Serie created successfully!'
        })

    }
    catch(err){
        console.log(err);
        next(err);
    }
}

// @desc      Delete serie 
// @route     DELETE/serie/:id
exports.deleteSerie = async(req,res,next)=>{

    try{
        
        const serieId = req.params.id;
        const serie = await Serie.findById(req.params.id);
   
        if (!serie) {
            return next(
                res.status(401).json({ success: false, message: "Seri bulunamadı" })
            );
          }
    
    const result = await Serie.findByIdAndRemove(serieId);
    const influencer = await Influencer.findById(req.userId);
    influencer.series.pull(serieId);
    await influencer.save();

    res.status(200).json({ message: 'Deleted serie.' }); 
    
  
    }
    catch(err){
        next(err);
    }
   



}