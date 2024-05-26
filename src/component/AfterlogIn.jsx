import { useSelector,useDispatch } from "react-redux";
// FaAnglesRight
import { setAllProducts } from "../redux/slice/User";
import { setUserName } from "../redux/slice/User";
import { setCartData } from "../redux/slice/User";

import { CgDetailsMore } from "react-icons/cg";
import { CgMoreO } from "react-icons/cg";
import { FaAnglesRight } from "react-icons/fa6";

import { useEffect,useState } from "react";
import axios from "axios";

import Navi from "./Navi";
import Poster from "./Poster";
import ProductCard from "./ProductCard"; 
import Home from "./Home";
import CategotyOffers from "./CategotyOffers";
import Footer from "./Footer";

import fashion from "../assets/fashion.webp"
import Loading from "./Loading";
import { useNavigate } from "react-router";


function AfterLogIn(params) {

   

    const dispatch = useDispatch();
    const [total,setTotal] =  useState(0); 
    // const [cart, setCart] = useState([]);
    const [allProductsList, setAllProductsList] = useState([]);
    const allProductsListDummy = useSelector((store) => store.userDetail.allProducts);
    const username = useSelector((store) => store.userDetail.userName);
    const [showData,setShowData] = useState(true)
    const cartData = useSelector((store) => store.userDetail.cartData);

    let flag =  false;   

    // async function fetchData() {
    //     let response = await fetch('http://fakestoreapi.com/products');
    //     let data = await response.json();
    //     data = data.map(item => ({ ...item, inCart: false, totalNo: 0 }));
    //     dispatch(setAllProducts(data));
    //     setAllProductsList(data);
    //     setCart(cartData);
    // }
    
    useEffect(() => {
        // fetchData();
        // fetchCartList();
        // if(flag === false){
        //     console.log("printing the cart",cartData);
        //     flag = true;
            updateProductListInCart(cartData);
        // }
        
    }, []); 


    function updateProductListInCart(cartData) {
        
        console.log("updateding the global list",cartData,allProductsListDummy);
        // Create an object from cartData for quick ID to quantity mapping
        const cartIdToQuantityMap = cartData.reduce((acc, item) => {
            acc[item[0]] = item[1]; // Map each ID to its quantity
            return acc;
        }, {});
    
        const updatedProducts = allProductsListDummy.map(product => {
            // Check if the product's ID is in cartData
            const quantity = cartIdToQuantityMap[product.id];
            return {
                ...product,
                inCart: quantity !== undefined, // If there's a quantity, product is in cart
                totalNo: quantity || 0 // Set totalNo to the quantity, or 0 if not present
            };
        });
    
        dispatch(setAllProducts(updatedProducts));
        setAllProductsList(updatedProducts);
    
        // Calculate total cost
        const totalCost = updatedProducts.reduce((acc, product) => {
            return product.inCart ? acc + (product.price * product.totalNo) : acc; // Multiply by totalNo for total cost
        }, 0);
        setTotal(totalCost)
        console.log("Total cost:", totalCost);
        setShowData(true);
        
        console.log("updated the global list",cartData,allProductsListDummy);
    }
    const navi = useNavigate();
    function ClickHandler(){
        navi("/products")
    }


    // handling add to cart at local level
    // based on the cart array yet not updated to the 
    // allProducts array which is redux data
    // function cartHandler(flag, id, num) {
    //     console.log(username);
    
    //     if (flag === false) {
    //         const newCart = [...cartData, [id, 1]];  // Safe as it's adding a new sub-array
    //         // setCart(newCart);
    //         dispatch(setCartData(newCart));
    //         console.log(newCart);
    //         updateProductListInCart(newCart);
    //         return true;
    //     } else if (flag === true) {
    //         const index = cartData.findIndex(item => item[0] === id);
    
    //         if (index !== -1) {
    //             // Deep copy the cart including sub-arrays to avoid direct mutation
    //             const newCart = cartData.map(item => [...item]); // Creates a new array for each sub-array
    
    //             // Modify the newly created sub-array
    //             newCart[index][1] += num;
    
    //             if (newCart[index][1] <= 0) {
    //                 newCart.splice(index, 1);  // Safe, as we are operating on a new array
    //                 // setCart(newCart);
    //                 dispatch(setCartData(newCart));
    //                 console.log(newCart);
    //                 updateProductListInCart(newCart);
    //                 return 0;
    //             }
    
    //             // setCart(newCart);
    //             dispatch(setCartData(newCart));
    //             console.log(newCart);
    //             updateProductListInCart(newCart);
    //             return newCart[index][1];
    //         }
    //     }
    // }
    
    // useEffect(() => {
    //     console.log("updated list: ")
    //     console.log("...",allProductsListDummy);
    // }, [allProductsListDummy]); 
 
    

    return ( 
        <div>
             
            <Home/> 

             {/* featured products */}
            {showData === true ? 
            
            <div className="flex flex-col flex-wrap md:px-[10%] justify-center items-center md:gap-5 gap-1 py-[5rem]  ">

                <h2
                    className=" md:text-[3rem] text-[1.7rem] text-start font-semibold text-green-950 "
                >Featured Products</h2>

                <div
                    className=" w-[5rem] h-[1.5px] bg-sky-500 mb-7 "
                ></div>

                <div
                    className="flex flex-row flex-wrap justify-center  items-center gap-5  "
                >
                    {
                        allProductsListDummy
                            .slice(0, 8) // Extract the first 10 items
                            .map(item => <ProductCard key={item.id} item={item}
                                //  cartHandler={cartHandler}
                                 />)
                    }
                </div>

                <div>
                

                    <button onClick={ClickHandler}
                     className=" flex  text-2xl items-center justify-center gap-4 font-semibold text-emerald-600 hover:text-sky-600 " >
                        More Product <FaAnglesRight/>
                    </button>
                    {/* import { FaAnglesRight } from "react-icons/fa6"; */}

                </div>

            </div> : <Loading/>
            }

            <CategotyOffers/>
              
              {/* shirt special offer */}
            <div
                className="relative mx-[10%] sm:h-[24rem] h-[22rem] md:h-[30rem] my-[8rem] flex flex-col justify-center items-end pl-[40%]  text-indigo-800   md:text-sky-700 -500  pr-7  "
                style={{
                    backgroundImage: `url(${fashion})`,
                    backgroundSize: 'contain', // Adjust the size of the background image
                    backgroundAttachment: 'fixed' // Make the background image fixed
                }}
            > 
                <h3   className=" md:text-[1.7rem] sm:text-[1.2rem] text-[0.8rem] font-semibold "
                >Limited Time Offer
                </h3>

                <h2 className=" md:text-[3.2rem] sm:text-[2.5rem] text-[1.5rem] font-semibold "
                >Special Edition
                </h2>

                <p  className=" md:text-end mb-4 md:text-[1rem] text-[0.6rem]"
                > Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel laborum quos impedit nostrum veniam ea porro, doloremque molestias dolore molestiae.</p>

                <p className=" text-[1rem] font-semibold "
                >Buy This Shirt At 20% Discount, Use Code OFF20
                </p>

                <button  
                        className="mt-4 px-[1.5rem] py-[0.5rem] md:text-[1.3rem] text-[0.7re] font-semibold
                        rounded bg-slate-50 hover:bg-slate-00 "
                > Shop Now</button>


            </div>
                
                {/* all product discount offer */}
            <div
            className="text-[1.8rem]  font-semibold bg-slate-100 py-[2rem]  border border-slate-200"
            >
                <a 
                    className=" hover:text-sky-700 transition duration-300   "
                href="#">
                    SALE UP TO 70% OFF FOR ALL CLOTHES & FASHION ITEMS, ON ALL BRANDS.
                </a>
            </div>

            <Footer/>

            {/* <h1>DDDD: {allProductsList.length}
            <br></br>
            {total}</h1> */}
            

        </div>
    );
}

export default AfterLogIn;
 
