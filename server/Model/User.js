const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    { 
        id: {
            type: String,
            unique: true,
            required: true
        },
        username: {
            type: String,
            maxLength: 50,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        streetAddress: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        zipcode: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        mobile_no: {
            type: String,
        },
        gender: {
            type: String
        },
        itemList: {
            type: Array,
            default: []
        },
        wishList: {
            type: Array,
            default: []
        },
    }
);

module.exports = mongoose.model("User", schema);
