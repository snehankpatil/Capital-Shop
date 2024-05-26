

const { request, response } = require("express")
const User = require("../Model/User")

exports.addToCart = async(request,response)=>{

    try{
        

        response.status(200).json(
            {
                success:true,
                data:updatedOne,
                message:"initial array data added"
            }
        )
    }
    catch(error){
        response.status(500).json(
            {
                success:false,
                message:"error occured while updating the array "
            }
        )
    }
 
}