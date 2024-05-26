
const { response } = require("express");
const User = require("../Model/User");

exports.Login = async(request,response) =>{
    try{
        const {username,password} = request.body;
        const user = await User.findOne({username:username});

        if(!user){
            response.status(404).json({
                success:false,
                message:`No user of ${username} found`
            })
        } 
        else if(user.password == password){
            console.log(user);
            response.status(200).json({
                success:true,
                data:user,
                message:`Welcome ${username} !`
            })
        }
        else{
            response.status(400).json({
                success:false,
                message:`Incorrect Password`
            })
        }
 
    }
    catch(e){

        response.status(500).json({
            success:false,
            message:`Error occured while login \n error:` + e.message
        })
    }
}