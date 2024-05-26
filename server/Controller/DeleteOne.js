
const Todo = require("../Model/Todo");

exports.DeleteOne = async(request,response)=>{
    try{
        const {title} = request.body; 
        const deletedOne = await Todo.deleteOne({ title: title });

        if(!deletedOne){
            response.status(404).json(
                {
                    success:false,
                    message:`the entry for ${title} is not found`
                }
            )
        }

        response.status(500).json(
            {
                success:true,
                data:deletedOne,
                message:`the entry for ${title} is deleted`
            }
        )


    }
    catch(error){
        response.status(500).json(
            {
                success:false,
                message:error
            }
        )
    }
}