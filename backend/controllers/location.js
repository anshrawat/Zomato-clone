const Locations=require('../models/location')


exports.getAllLocations=(req,res)=>{
    Locations.find()
       .then(
           result=>{
               res.status(200).json({
                   message:"locations fetched successfully",
                   data:result
               })
           }
       )
       .catch(
           error=>{
               res.status(500).json({
                   message:"error occurred fetching location",
                   data:error
               })
           }
       )
}