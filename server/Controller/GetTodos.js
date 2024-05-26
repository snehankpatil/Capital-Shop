
const Todo = require("../Model/Todo") 

exports.GetTodos = async(request,response)=>{
  
    try{
        
        const todos = await Todo.find({});

        response.status(200).json(
            {
                success:true,
                data:todos,
                message:"all data fetched successfully"
            }
        )

    }
    catch(error){
        response.status(500).json(
            {
                success:false, 
                message:"all data not fetched successfully"
            }
        )
    }

}