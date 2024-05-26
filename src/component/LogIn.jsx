// import { FaEye } from "react-icons/fa";
// import { FaEyeSlash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";


import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import loginBack from "../assets/logIn_back.png"
import logo from "../assets/logo.png.webp"

import { setUserName } from "../redux/slice/User";
import { setCartData } from "../redux/slice/User";
import { setAllProducts } from "../redux/slice/User";

import { useNavigate } from "react-router-dom";


import axios from "axios";

function LogIn(){

    const user = useSelector((store)=>(store.userDetail.userName));
    const cart = useSelector( (store)=>(store.userDetail.cartData) );
    const allProducts = useSelector( (store)=>(store.userDetail.cartData) );
    const dispatch = useDispatch();



    // const [cart,setCart] = useState([]); 
    const [isFetchedCart,setIsFetchedCart] = useState(false);
    const [isFetchedProducts,setIsFetchedProducts] = useState(false);

    const navi = useNavigate();

    const [userData,setUserData] = useState({username:"",password:""});
    const [data,setPromt]= useState("");

    function changeHandler(event){
        const {id,value} = event.target;

        setUserData((prev)=>{
            return {...prev , [id]:value}
        })
        console.log(userData);

    } 

    // for login and cart retrieval for the user
    function SubmitHandler(event){
        event.preventDefault();
        const {username,password} = userData;
        console.log(userData)
        
        axios.post('/api/v1/signIn', {
             username, password 
        })
        .then(response => {
            // This block will be executed for status codes from 200 to 299
            console.log('Success:', response.data);
            dispatch(setUserName(username));

            if(response.data.data.itemList.length === 0){
                dispatch(setCartData([[-1,-1]]));
            }
            else{
                dispatch(setCartData(response.data.data.itemList));
            } 
            setPromt(response.data.message);  // Assuming response.data.message contains the success message
            console.log(response.data.data.itemList)
            
        })
        .catch(error => {
            dispatch(setUserName(""));
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log('Error:', error.response.status, error.response.data);
                setPromt(error.response.data.message || 'An error occurred');  // Display server-provided error or a default message
            } else if (error.request) {
                // The request was made but no response was received
                console.log('Error:', error.request);
                setPromt('No response from server');  // Handle no response situation
            } else {
                // Something happened in setting up the request that triggered an error
                console.log('Error', error.message);
                setPromt('Error during request setup');
            }  
        })
        .finally(() => {
            setIsFetchedCart(true);
        });

         
    }

    async function fetchData() {
        let response = await fetch('http://fakestoreapi.com/products');
        let data = await response.json();
        data = data.map(item => ({ ...item, inCart: false, totalNo: 0 ,inWishlist:false}));
        dispatch(setAllProducts(data));
        setIsFetchedProducts(true)
    }

    useEffect(()=>{
        if(isFetchedCart){
            fetchData(); 
        } 
    },[cart,isFetchedCart])

    useEffect(()=>{
        if(isFetchedProducts){ 
            navi("/home")
        }
    },[allProducts,isFetchedProducts])

    const [showPass,setShowPass] = useState(false);

    function showPassHandler(){
        setShowPass(!showPass)
    }

    function signupClickHandler() {
        navi("/signUp")
    }
     

    return (
        <div 
        className="flex flex-row  w-full lg:justify-around lg:items-center h-[100vh]
        j justify-center items-center space-x-8 bg-gradient-to-r from-blue-200 to-transparent
        py-24 px-7">
            <div className=" border-2 border-blue-100 shadow-2xl md:basis-2/5  flex flex-col p-7 mx-12">


                <img src={logo} alt=""
                    className=" w-[40%] mb-5 mx-auto "
                />

                <h2 className="fles text-4xl text-cyan-500  text-center " >Welcome Back</h2>
                <p className="fles text-xl text-gray-500 text-center "  >Log in to access Capital Shop.</p> 
                
                <form onSubmit={SubmitHandler}
                    className="relative mt-5  flex flex-col"
                >
                    <label>
                        <p className="fles text-md text-indigo-500 font-semibold pb-1 pt-4 text-start" >Username <span className="mx-1 text-red-600 inline" >*</span> </p>
                        <input type="text" placeholder="patil78" id="username" required onChange={changeHandler}
                            className="  bg-gradient-to-r border border-sky-300  outline-none
                            fo focus:opacity-60 
                            py-2 w-full " 
                        />
                    </label>

                    <label>
                        <p  className="text-start text-md text-indigo-500 font-semibold pb-1 pt-4"  >Password <span className="mx-1 text-red-600 inline" >*</span> </p>
                           
                        <input type={`${showPass?'text':'password'}`} placeholder="enter the password" id="password" required onChange={changeHandler} 
                            className="  bg-gradient-to-r border border-sky-300  outline-none
                            fo focus:opacity-60
                            py-2 w-full" 
                        />
                    </label>
                    
                    <div className="absolute right-6 bottom-[8.1rem]" >
                        <FaEye 
                        className={`absolute ${showPass?'hidden':''}`} 
                        onClick={showPassHandler}
                        />
                        <IoMdEyeOff 
                        className={`absolute ${showPass?'':'hidden'}`} 
                        onClick={showPassHandler}
                        />
                    </div>

                    <div className="flex w-full justify-end text-green-600" > 
                        <button> Forgot Password </button>
                    </div> 
                    <button type="submit" className="w-full mt-4 bg-gradient-to-r from-blue-600 to-violet-600
                        py-[2px] text-gray-700 t text-md hover:opacity-90
                    font-semibold  rounded-md"  > Sign IN </button> 

                    <div className="f font-semibold flex mt-3 gap-2 ">
                        <p className=" text-gray-700  " >Don't have a Capital Shop account? </p>
                        <a href="/signUp" className=" text-sky-700 hover:text-emerald-500">Sign Up</a>
                    </div>
            
                </form>

            </div>
           

            <div className="m hidden md:block">
                <img src={loginBack}
                    className="md:w-[20rem] lg:w-[25rem]"
                />

            </div>


        </div>
    );
}

export default LogIn;



// <div>
// <label>
//     Password
//     <input type="password" placeholder="enter the password" id="password" />
// </label>
// <div>
//     <FaEyeSlash  />
//     <FaEye />
// </div>
// </div>