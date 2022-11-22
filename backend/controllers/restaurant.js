//const restaurants=require('../models/restaurant.json')

const Restaurants=require('../models/restaurant')


const fs=require('fs')
const { getEventListeners } = require('events')


//using mongoose
exports.getAllRestaurants=(req,res)=>{
    Restaurants.find()
       .then(
           result=>{
               res.status(200).json({
                   message:"restaurant fetched successfully",
                   data:result
               })
           }
       )
       .catch(
           error=>{
               res.status(500).json({
                   message:"error occurred",
                   error:error
               })
           }
       )
    
 }

//functionality
// exports.getAllRestaurants=(req,res)=>{
//    // res.send('you called GET restaurant method.')
//    res.status(200).json({
//        message:"restaurant fetched successfully" ,
//        data:restaurants
//    })
// }

//using Restaurants (mongoose version)
exports.getRestaurantsByCity=(req,res)=>{
    //console.log(req.params.city_name)
    let criteria={city:req.params.cName}
    console.log(criteria)
    Restaurants.find(criteria)
    .then(
        result=>{
            res.status(200).json({
                message:"restaurant fetched successfully",
                data:result
            })
        }
    )
    .catch(
        error=>{
            res.status(500).json({
                message:"error occurred",
                error:error
            })
        }
    )
}

exports.getAllRestaurantsByFilter=(req,res)=>{
    //filtering through city_id
    let filter={}
    if(req.body.city_id){
        filter.city=req.body.city_id;
    }
    //$in operator is used where for single key there are different values and u are ok with those values
    if(req.body.cuisine && req.body.cuisine.length >0){
        filter['Cuisine.name']={$in:req.body.cuisine}
    }

    //filtering according to cost
    //console.log("lcost",req.body.lcost)
    if(req.body.lcost !=='' && req.body.lcost==0){
        filter.cost={
            $lte:req.body.hcost
        }
    }
    else
    if(req.body.lcost && req.body.hcost){
        filter.cost={
            $lt:req.body.hcost,
            $gt:req.body.lcost
        }
    }

    // if(req.body.lcost && req.body.hcost){
    //     if(req.body.lcost==0){
    //         filter.cost ={
    //             $lte :req.body.hcost
    //         }
    //     }
    //     else{
    //        filter.cost= {
    //            $lt: req.body.hcost,
    //            $gt: req.body.lcost
    //        } 
    //     }
    // }

   // console.log("get all restaurants by filter")
   let sort=1;
   console.log(req.body.sort)
   if(req.body.sort){
       sort=req.body.sort
   }
   console.log("filter:",filter)
   //pagination and sorting
//    Restaurants.find(filter).limit(2).skip(2*(req.params.pageNo-1)).sort({"cost":filter.sort}).then(
//     result=>{
//         Restaurants.find(filter).count((err,count)=>{
//             if(err)
//             console.log(err)
//             else
//             res.status(200).json({ message:"data fetched successfully" , data:result ,totalRecords:count})
  
//         })
//          }
// ).catch(error=>{
//         res.status(500).json({ message:"Error in database" , error:error })
// })
// }
   Restaurants.find(filter).limit(2).skip(2*(req.params.pageNo-1)).sort({cost:sort})
       .then(
           result=>{
               Restaurants.find(filter).count((err,count)=>{
                 if(err)
                   console.log(err)
                 else
                 res.status(200).json({
                    message:"restaurant fetched successfully",
                    data:result,
                    totalRecords:count
                })
               })
               
           }
       )
       .catch(
           error=>{
               res.status(500).json({
                   message:"error occurred",
                   error:error
               })
           }
       )
}


exports.getRestaurantDetails=(req,res)=>{
    let criteria={
        name:req.params.name
    }
    Restaurants.findOne(criteria)
    .then(
           result=>{
               res.status(200).json({
                   message:"restaurant fetched successfully",
                   data:result
               })
           }
    )
    .catch(
           error=>{
               res.status(500).json({
                   message:"error occurred",
                   error:error
               })
           }
    )
}

// exports.getRestaurantsByCity=(req,res)=>{
//     //console.log(req.params.city_name)

//     const filteredRestaurants=restaurants.filter((item)=>item.city==req.params.city_name)
    
//     filteredRestaurants.length?
//     res.status(200).json({
//         message:"restaurant fetched by city name",
//         data:filteredRestaurants
//     }) :

//     res.status(200).json({
//         message:"no records found",
//     })
    
// }

// exports.addRestaurant=(req,res)=>{
//     restaurants.push(req.body)
//     //file operation:writing onto the file
//     // fs.writeFile('../models/restaurant.json',restaurants,()=>{

//     // })
//     res.status(200).json({
//         message:"restaurant added successfully...",
//         data:restaurants
//     })
// }

// exports.updateRestaurant=(req,res)=>{
//     //to update an array we find index and change value at that index
//     const index=restaurants.findIndex((item)=>item.name==req.body.name)
//     restaurants[index].city=req.body.city;
//     res.status(200).json({
//         message:"restaurant updated successfully...",
//         data:restaurants
//     })
// }

// exports.deleteRestaurant=(req,res)=>{
//     const index=restaurants.findIndex((item)=>item.name==req.params.id)
//     restaurants.splice(index,1);
//     res.status(200).json({
//         message:"restaurant deleted successfully...",
//         data:restaurants
//     })
// }