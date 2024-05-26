

const express = require("express");
const router = express.Router();

// importing the controller
const {createTodo} = require("../Controller/CreateTodo");
const {GetTodos} = require("../Controller/GetTodos");
const {UpdateOne} = require("../Controller/UpdateOne")
const {DeleteOne} = require("../Controller/DeleteOne")
const {CreateNewUser} = require("../Controller/CreateNewUser")
const {Login} = require("../Controller/LoginUser")
const {addToCart} = require("../Controller/AddToCart")
const {retrieveCart} = require("../Controller/RetrieveCart")
const {LogoutCartSave} = require("../Controller/LogoutCartSave")
const {FetchUser} = require("../Controller/FetchUser")
const {CheckUser} = require("../Controller/Checkuser")

// defining the API routes 

// adding the todos
router.get("/fetchTodos",GetTodos);
router.post("/insertTodo", createTodo);
router.put("/correctOne",UpdateOne);
router.delete("/deleteOne",DeleteOne);

// signUp and signIn for the user

router.post("/checkUser",CheckUser);
router.post("/signUp",CreateNewUser);
router.post("/signIn",Login);
router.post("/addToCart",addToCart);
router.post("/retrieveCart",retrieveCart);
router.post("/logoutCartSave",LogoutCartSave);
router.post("/fetchUser",FetchUser);




module.exports = router;    


