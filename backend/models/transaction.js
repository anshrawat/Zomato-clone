const mongoose=require('mongoose')

const transactionSchema=new mongoose.Schema({
   transaction_id:{
    type:String
   },
   transaction_amount:{
    type:String
   }
})
//mongoose.model("name you have given",schema name,"collection name")
module.exports=mongoose.model("Transactions",transactionSchema,"transactions")
