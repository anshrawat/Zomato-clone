const express=require('express')
const bodyParser=require('body-parser')
const restaurantRoutes=require('./routes/restaurant')
const locationRoutes=require('./routes/location')
const mealtypeRoutes=require('./routes/mealtype')
const menuRoutes=require('./routes/menu')
const paymentRoutes=require('./routes/payment')
// https://mongoosejs.com/docs/connections.html  //for establishing mongoose connection
const mongoose=require('mongoose')
const cors=require('cors')



const DBCONNECTIONSTRING="mongodb+srv://root:root1906@cluster0.btfircm.mongodb.net/zomato40";
 //'mongodb://localhost/zomato_40' //replaced with above one


//connect with mongoDB
mongoose.connect(
    DBCONNECTIONSTRING,
   
    ()=>{
    console.log("mongodb connected.")
},
e=>console.log(e))



const PORT=process.env.PORT||6767;

var app=express();

//middleware
app.use(bodyParser.json())
app.use(cors())
app.use('/restaurant',restaurantRoutes)
app.use('/location',locationRoutes)
app.use('/mealtype',mealtypeRoutes)
app.use('/menu',menuRoutes)
app.use('/pay',paymentRoutes)

//heroku configurations:
if(process.env.NODE_ENV="production"){
    app.use(express.static("frontend/build"))
}


app.listen(PORT,()=>{
    console.log(`app running on PORT :${PORT}`)
})