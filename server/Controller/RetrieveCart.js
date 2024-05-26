
const User = require("../Model/User");

exports.retrieveCart = async(request,response) =>{

    try{
        const {username } = request.body;
        
        const user = await User.findOne( {username: username} );

        response.status(200).json(
            {
                success:true,
                data:user,
                message:"cart retrieved successfully"
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