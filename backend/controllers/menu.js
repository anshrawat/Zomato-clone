const Menu=require('../models/menu')

exports.getMenuByRestaurant=(req,res)=>{
    let filter={
        restaurantName:req.params.rName
    }
    Menu.find(filter).then(result=>{
        res.status(200).json({message:"Menu fetched successfully",data:result})
    }).catch(e=>
        res.status(500).json({message:"error in db",error:e}))
}