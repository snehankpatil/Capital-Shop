
// first of all install mongoose on folder or repo
// npm i mongoose

const mongoose = require("mongoose")

require("dotenv").config()

function DbConnect(){
    mongoose.connect(process.env.URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=>{console.log("connection established successfully")})
    .catch((error)=>{
        console.log("error in connection establishment",error)
        process.exit(1);
    })
}

module.exports = DbConnect;