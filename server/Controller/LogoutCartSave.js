

const User = require("../Model/User");

exports.LogoutCartSave = async(request,response) =>{

    try{
        const {username,cartData } = request.body;
        
        
        const updatedOne = await User.findOneAndUpdate(
            { username: username },  // filter by title
            { itemList: cartData },  // fields to update
        );
        console.log( updatedOne);
        response.status(200).json(
            {
                success:true,
                data:updatedOne,
                message:"entry has updated successfully"
            }
        )
    }
    catch(error){
        response.status(500).json(
            {
                success:false,
                message:"error in cart retrieving"
            }
        )
    }

}