

const User = require("../Model/User");

exports.FetchUser = async(request,response) =>{

    try{
        const {username} = request.body;
        
        const user =  await User.find({username: username })
         
        console.log( user);
        response.status(200).json(
            {
                success:true,
                data:user,
                message:"user fetched successfully"
            }
        )
    }
    catch(error){
        response.status(500).json(
            {
                success:false,
                message:"error in cart retrieving" + error
            }
        )
    }

}