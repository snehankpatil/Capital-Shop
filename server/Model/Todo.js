
const { kMaxLength } = require("buffer")
const mongoose = require("mongoose")
const { type } = require("os")
const { title, uptime } = require("process")

const schema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
            maxLength:50
        },
        description:{
            type: String,
            maxLength:200
        },
        createdAt:{
            type:Date,
            required: true,
            default:new Date()  
        },
        updateAt:{
            type:Date,
            required:true,
            default:new Date()
        }
    }
);

module.exports = mongoose.model("Todo",schema)