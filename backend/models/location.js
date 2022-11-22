const mongoose=require('mongoose')

const locationSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    city_id:{
        type:String,
        required:true
    },
    country_name:{
        type:String,
        required:true
    },
    
})
//mongoose.model("name you have given",schema name,"collection name")
module.exports=mongoose.model("locations",locationSchema,"location")
