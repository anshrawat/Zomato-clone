const express=require('express')
const locationController=require('../controllers/location')
const router=express.Router();


//delegating task to controller
router.get('',locationController.getAllLocations)
//using url parameter
// router.get('/:city_name',restaurantController.getRestaurantsByCity)

// router.post('',restaurantController.addRestaurant)

// router.put('',restaurantController.updateRestaurant)

// router.delete('/:id',restaurantController.deleteRestaurant)

module.exports=router;