import {useDispatch,useSelector} from "react-redux";
 
import { setCartData } from "../redux/slice/User";
import { setUserName } from "../redux/slice/User";
import { setAllProducts } from "../redux/slice/User";
import { setUser } from "../redux/slice/User";
import { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import { FaRegUserCircle } from "react-icons/fa";
import { IoBagHandleSharp } from "react-icons/io5";
import { MdLogout } from "react-icons/md";



import logo from "../assets/logo.png.webp"


function Navi(params) {

    const username = useSelector((store) => store.userDetail.userName);
    const cartData = useSelector((store) => store.userDetail.cartData);
    // const user  = useSelector((store) => store.userDetail.cartData);

    const navi = useNavigate();
    const dispatch = useDispatch();

    function logoutHandler() {
        // final cart save for the user
         console.log("cart data as per user in logoit",cartData);

        axios.post('/api/v1/logoutCartSave', { username,cartData })
        .then(response => {
            console.log(response.data.data);
            dispatch(setUserName(""))
            dispatch(setCartData([]))
            dispatch(setAllProducts([]))
            navi("/")
        })
        .catch(error => {
            console.log(error.message);
            console.log('Error fetching cart', error);
        });
    }
    const [isMenuVisible, setMenuVisible] = useState(false);
    // State to manage the visibility of the dropdown
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    // Function to toggle the main menu visibility
    const handleMenuToggle = () => {
      setMenuVisible(!isMenuVisible);
    };

    // Function to toggle the dropdown visibility
    const handleDropdownToggle = () => {
      setDropdownVisible(!isDropdownVisible);
    };

    function categotyPageHandler(param) {
      // console.log(props.category);
      if(param == "all"){
        navi("/products")
      }
      else{
        navi(`/products/${param}`)
      }
     
  }

    function GotoUser(){
      navi("/user") 
      axios.post('/api/v1/fetchUser', { username  })
      .then(response => {
          // This block will be executed for status codes from 200 to 299
          // console.log('Success:', response.data.data);
          dispatch(setUser(response.data.data));
      
      })
      .catch(error => {
          
          if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log('Error:', error.response.status, error.response.data);
              } 
              else if (error.request) {
              // The request was made but no response was received
              console.log('Error:', error.request);
              } else {
              // Something happened in setting up the request that triggered an error
              console.log('Error', error.message);
                
          }  
        })
        .finally(() => { 
          
        });
      
    }

    return (
      <nav className=" z-50 py-2 border-gray-200 absolute  bg-opacity-50 bg-sky-700   w-full ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-8" alt="Flowbite Logo" />
          {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span> */}
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        
          
          <ul className="f flex flex-row justify-between items-center gap-4">
            <li>
              <a onClick={(GotoUser)}  className="block text-2xl py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                <FaRegUserCircle/>
              </a>
            </li>

            <li>
              <a onClick={()=>(navi("/cart"))}  className="block text-2xl py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                <IoBagHandleSharp/>
              </a>
            </li> 

            <li>
              <a onClick={logoutHandler} className="block text-2xl py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                <MdLogout/>
              </a>
            </li>
          </ul>
          {/* Home */}
          <button 
            onClick={handleMenuToggle}
            data-collapse-toggle="navbar-cta" 
            type="button" 
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" 
            aria-controls="navbar-cta" 
            aria-expanded={isMenuVisible}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
        </div>
        <div className={` items-end justify-end   ${isMenuVisible ? 'flex' : 'hidden'} w-full md:flex md:w-auto md:order-1`} id="navbar-cta">
          <ul className="flex flex-col  font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:border-gray-700">
            <li>
              <a href="#" className="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500" onClick={()=>(navi("/home"))} aria-current="page">Home</a>
            </li>
            <li className="relative  z-50">
              <button
                onClick={handleDropdownToggle}
                className="flex items-center justify-center w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
              >
                Products
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {/* flowbite */}
              <div className={`${isDropdownVisible ? 'block' : 'hidden'} absolute z-10 font-normal bg-sky-700 divide-y  bg-opacity-60 divide-gray-100 rounded-lg shadow w-44`}>
                <ul className="py-2 text-sm  bg-opacity-15 text-white  dark:text-gray-400">
                  <li>
                    <a 
                    onClick={()=>categotyPageHandler("all")}
                    href="#" className="block text-white px-4 py-2 bg-opacity-0 hover:bg-gray-800 ">
                      Everything
                    </a>
                  </li>
                  <li>
                    <a 
                    onClick={()=>categotyPageHandler("men's clothing")} 
                    href="#" className="block px-4 py-2 text-white bg-opacity-0 hover:bg-gray-800 ">
                      Men's Wear
                    </a>
                  </li>
                  <li>
                    <a  
                    onClick={()=>categotyPageHandler("women's clothing")}
                    href="#" className="block px-4 py-2 text-white bg-opacity-0 hover:bg-gray-800 ">
                      Women's Wear
                    </a>
                  </li>
                  <li>
                    <a 
                    onClick={()=>categotyPageHandler("jewelery")} 
                    href="#" className="block px-4 py-2 text-white bg-opacity-0 hover:bg-gray-800 ">
                      Jewelry
                    </a>
                  </li>
                  <li>
                    <a 
                     onClick={()=>categotyPageHandler("electronics")}  
                    href="#" className="block px-4 py-2 text-white hover:bg-gray-800 dark:hover:bg-gray-600 dark:hover:text-white">
                      Electronics
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
            </li>
          </ul>
        </div>
      </div>
      </nav>
    );
  };
  
  export default Navi;