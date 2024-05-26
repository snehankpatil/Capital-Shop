
const { response } = require("express");
const Todo = require("../Model/Todo");
const { request } = require("http");

exports.UpdateOne = async(request,response) =>{

    try{
        const {title, description } = request.body;

        const updatedOne = await Todo.findOneAndUpdate(
            { title: title },  // filter by title
            { description: description },  // fields to update
            { updateAt: new Date() }  // option to return the updated document
        );

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
                message:"error occured while updating the entry"
            }
        )
    }

}