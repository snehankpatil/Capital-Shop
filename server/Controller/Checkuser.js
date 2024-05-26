

const User = require("../Model/User");

exports.CheckUser = async(request,response) =>{

    try{
        const {id,username,password,mobile_no,gender} = request.body;
        console.log(id,username,mobile_no,gender);

        const userId = await User.findOne({id:id});

        if(userId){
            response.status(400).json(
                {
                    success:false, 
                    message:`User with id: ${id} exist choose other`
                }
            )
            return;
        }

         

        const userWithSameUsername = await User.findOne({username:username});
        if(userWithSameUsername){
             response.status(400).json(
                {
                    success:false, 
                    message:`User with username: ${userWithSameUsername.username} exist choose other`
                }
            )
            return ;
        }
 


        return response.status(200).json(
            {
                success:true, 
                message:"Moving forward with for more details"
            }
        )

    }
    catch(error){
        response.status(500).json(
            {
                success:false,
                message:"error in while checking the user" + error
            }
        )
    }

}