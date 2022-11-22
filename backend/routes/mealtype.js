const express=require('express')
const mealtypeController=require('../controllers/mealtype')
const router=express.Router();

router.get('',mealtypeController.getAllMealtypes)


module.exports=router;