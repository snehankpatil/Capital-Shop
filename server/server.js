
const express = require("express")
const app = express();

// importing and loading the data into process
// object for the using in this file

require("dotenv").config(); 
const PORT = process.env.PORT || 5000;

// middleware to parse the JSON body
app.use(express.json());

// import routed for the todo api 
const todoRoutes = require("./Routes/MyRoutes");

// using the /api/v1 for the heirarchical purposes only
app.use('/api/v1',todoRoutes);
  
// starting the server


// connecting the DB 
const DbConnect = require("./Config/database");
DbConnect();

// default route 
app.get("/api",(req,res)=>{
    res.json({message:"it is homepage use the path bastard"}) 
}) 

app.listen(3000, () => {
    console.log(`server is instantiated successfully at PORT ${3000}`)
});
