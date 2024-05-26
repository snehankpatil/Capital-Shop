
import { useEffect,useState } from "react";
import user from "../assets/user.jpg"
import { IoMdHeart } from "react-icons/io";
import { IoBagHandleSharp } from "react-icons/io5";

import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function CustomerProfile(params) {

    const user  = useSelector((store) => store.userDetail.user);

    const [data,setData] = useState([]);

    useEffect(()=>{
        // console.log(user[0])
        setData(user[0])
    },[user])

    const navi = useNavigate();

    


    return (
         
        // <!-- component -->
<div class="bg-gray-300 antialiased">
    <div class="container mx-auto py-20">
        <div>
            <div class="bg-white p-3 relative shadow rounded-lg w-5/6 md:w-5/6 lg:w-4/6 xl:w-3/6 mx-auto">
                <div class="p-3 rounded-md flex flex-col gap-3 pb-5 items-center bg-slate-400 justify-center">
                    <FaUserCircle className=" w-[5rem] h-[5rem] text-slate-700" />
                    <div >
                        <h1 class="font-bold text-center text-3xl text-gray-900">User Information</h1>
                    </div>
                </div>
                
                <div class="mt-2">
                   
                    {/* detail */}
                    <div class="px-6 flex flex-col gap-3">
                             <div class="flex gap-3 ">
                                <h3 class=" text-start font-medium text-gray-900">ID:</h3>
                                <p class="  text-gray-600">664cd2342d7e2a11065ddd1f</p>
                            </div>
                            <div class="flex gap-3">
                                <h3 class="text-start font-medium text-gray-900">Email:</h3>
                                <p class="text-gray-600">snehank@123</p>
                            </div>
                           <div class="flex gap-3">
                                <h3 class=" text-start font-medium text-gray-900">Username:</h3>
                                <p class="text-gray-600">sp</p>
                            </div>
                            
                            <div class="flex gap-3">
                                <h3 class=" text-start font-medium text-gray-900">Mobile No:</h3>
                                <p class="text-gray-600">44</p>
                            </div>
                         
                            <div class="flex gap-3">
                                <h3 class="font-medium text-gray-900">Gender:</h3>
                                <p class="text-gray-600">Male</p>
                            </div>

                            <div class="flex gap-3">
                                <h3 class="font-medium text-gray-900">Address:</h3>
                                <p class="text-gray-600 text-start">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis ab quaerat, dolore tempora rem cupiditate tempore animi assumenda sequi veniam!</p>
                            </div> 
                    </div>

                     
                    
                    <div class="w-full mt-5 ">
                        <h3 class="font-medium text-gray-900 text-left px-6">Your Products</h3>
                        <div class="mt-5 w-full flex flex-col items-center overflow-hidden text-sm">
                            
                            
                            <p onClick={()=>(navi('/wishlist'))} 
                            class="w-full  flex  w-full justify-center gap-3 items-center border-t font-semibold  hover:cursor-pointer text-gray-600 py-4 pl-6 pr-3 block hover:bg-gray-100 transition duration-150">
                                 
                                 <p>GoTo Wishlist </p>
                                 <IoMdHeart className=" w-[1.5rem] h-[1.5rem]  text-pink-600 hover:text-pink-800" />
                            </p>
                            
                            <p onClick={()=>(navi('/cart'))} 
                              class=" flex  w-full justify-center gap-3 items-center border-t font-semibold hover:cursor-pointer text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150 overflow-hidden">
                                 
                                 <p>GoTo Cart  </p>
                                 <IoBagHandleSharp className=" w-[1.5rem] h-[1.5rem]  text-emerald-300 hover:text-emerald-600" />
                                
                            </p>
                            
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
 </div>

    );
}

export default CustomerProfile; 