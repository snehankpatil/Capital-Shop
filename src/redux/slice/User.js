
// import {createSlice} from "@reduxjs/toolkit"

import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    userName:"",
    allProducts:[],
    cartData:[],
    user:[]
}

export const userSlice = createSlice({
    name:"userDetail",
    initialState,
    reducers:{
        setUserName :(state,action)=>{
            state.userName = action.payload;
            console.log(state.userName);
        },
        setAllProducts :(state,action)=>{
            state.allProducts = action.payload;
            console.log(state.allProducts);
        },
        setCartData :(state,action)=>{
            state.cartData = action.payload;
            console.log(state.cartData);
        },
        setUser : (state,action)=>{
            state.user = action.payload;
            console.log(state.user);
        }

    }
})

export const {setUserName,setAllProducts,setCartData,setUser} = userSlice.actions;
export default userSlice.reducer;


