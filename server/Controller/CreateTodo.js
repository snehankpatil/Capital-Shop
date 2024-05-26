// importing schema
const Todo = require("../Model/Todo");

// bcz of database interactoin async functoin is used
exports.createTodo = async(request,response)=>{

    try{
        //  extracting title and description from body
        const {title,description,createdAt} = request.body;

        // here we have created and inserted the db object inside the DB
        const res = await Todo.create({title,description,createdAt});
        console.log(title,description,createdAt);

        // send a json response with the succeess flag
        response.status(200)
        .json(
            {
                success:true,
                data:res,
                message:"new entry created"
            }
        );

    }
    catch(error){ 
        console.log(error);
        response.status(500)
        .json(
            {
                success:false,
                data:error,
                message:"new entry is not created"
            }
        )
    }

}

// module.exports = createTodo;