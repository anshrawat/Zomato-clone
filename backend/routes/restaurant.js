const express=require('express')
const restaurantController=require('../controllers/restaurant.js')
const router=express.Router();


//delegating task to controller
router.get('',restaurantController.getAllRestaurants)
//using url parameter
router.get('/:cName',restaurantController.getRestaurantsByCity)

//router.post('',restaurantController.addRestaurant)
router.post('/filter/:pageNo',restaurantController.getAllRestaurantsByFilter)
router.get('/details/:name',restaurantController.getRestaurantDetails)
//router.put('',restaurantController.updateRestaurant)

//router.delete('/:id',restaurantController.deleteRestaurant)

module.exports=router;


//whenever data is sent with request the method is post