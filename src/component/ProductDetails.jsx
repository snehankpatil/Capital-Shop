import StarRating from "./StarRating";

import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useLocation } from 'react-router-dom';

import ProductCard from "./ProductCard";
import Loading from "./Loading";

import { LuMinusCircle } from "react-icons/lu";
import { HiOutlinePlusCircle } from "react-icons/hi";


import { setAllProducts } from "../redux/slice/User";
import { setCartData } from "../redux/slice/User"; 
import Navi from "./Navi";


function ProductDetails(params) {
    const { title } = useParams();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    

    const allProductsListDummy = useSelector((store) => store.userDetail.allProducts);
    
    const [isLoaded,setIsLoaded] =useState(false);
    const [isCalled,setIsCalled] =useState(false);
    const [product,setProduct] = useState({});
    const [newList,setNewList] = useState([]);
    

    const dispatch = useDispatch();
  
    const[newTotalNum,setTotalNum] = useState(); 

    
    const [allProductsList, setAllProductsList] = useState([]);
    const [total,setTotal] =  useState(0); 
    const cartData = useSelector((store) => store.userDetail.cartData); 


    

    useEffect(()=>{
        console.log("id: ",id,allProductsListDummy);
        const filteredProduct = allProductsListDummy.find(item => {

            return item.id == id; // Find the item with id = 5
        });
        setProduct(filteredProduct);

        console.log("item: ",filteredProduct);
         
        const productsWithCategoryMenExceptId = allProductsListDummy.filter(item => {
            return item.category === filteredProduct.category && item.id != id; // Filter items with category men except for id = 5
        });
        setNewList(productsWithCategoryMenExceptId);
        
        setIsCalled(true);

    },[allProductsListDummy,id])
 
    useEffect(()=>{
        if(isCalled){ 
            // console.log(image)
            setIsLoaded(true);
        }
        
    },[product])

    function updateProductListInCart(cartData) {
        console.log("updating the global list",cartData,allProductsListDummy);
    
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
    }


    // handling add to cart at local level
    // based on the cart array yet not updated to the 
    // allProducts array which is redux data
    function cartHandler( id, num) {
      
    
        if (product.totalNo === 0) {
            const newCart = [...cartData, [id, 1]];  // Safe as it's adding a new sub-array
            // setCart(newCart);
            dispatch(setCartData(newCart));
            console.log(newCart);
            updateProductListInCart(newCart);
            return true;
        } else {
            const index = cartData.findIndex(item => item[0] == id);
    
            if (index !== -1) {
                // Deep copy the cart including sub-arrays to avoid direct mutation
                const newCart = cartData.map(item => [...item]); // Creates a new array for each sub-array
    
                // Modify the newly created sub-array
                newCart[index][1] += num;
    
                if (newCart[index][1] <= 0) {
                    newCart.splice(index, 1);  // Safe, as we are operating on a new array
                    // setCart(newCart);
                    dispatch(setCartData(newCart));
                    console.log(newCart);
                    updateProductListInCart(newCart);
                    return 0;
                }
    
                // setCart(newCart);
                dispatch(setCartData(newCart));
                console.log(newCart);
                updateProductListInCart(newCart);
                return newCart[index][1];
            }
        }
    }
    

    function addRemoveHandler(){
        let x =  cartHandler(product.id,0);
 
        // commentting it bcz it is handled by useefftect when valur of totalNo changes 
        // setTotalNum(x);
    }

    function incHandler(){
        console.log("increment",id)
        let x = cartHandler(product.id,1);
         
        // commentting it bcz it is handled by useefftect when valur of totalNo changes 
        // setTotalNum(x);
       
    }

    function decHandler(){
        console.log("decrement",id)
        let x = cartHandler(product.id,-1);
        
        // commentting it bcz it is handled by useefftect when valur of totalNo changes 
        // setTotalNum(x);
       
    }



    return(

        <div>

        <Navi/>
        
        {isCalled === false ? <Loading/> : 


            <div class=" pt-24 ">

            <section >
            <div class="w-full mx-auto px-4 sm:px-6 ">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 mx-auto max-md:px-2 ">
                    <div class="img">
                        
                        <div class="img-box h-full max-lg:mx-auto ">
                            <img src={product.image}  
                                class="max-lg:mx-auto lg:ml-auto h-[45re]"/>
                        </div>
                    </div>
                    <div
                        class="data w-full lg:pr-8 pr-0 xl:justify-start justify-center flex items-center max-lg:pb-10 xl:my-2 lg:my-5 my-0">
                        <div class="data w-full max-w-xl">
                            <p class="text-lg font-medium leading-8 text-indigo-600 mb-4">.{product.category}
                            </p>
                            <h2 class="font-manrope font-bold text-3xl leading-10 text-gray-900 mb-2 capitalize">
                                {product.title}   
                            </h2>
                            <div class="flex flex-col sm:flex-row sm:items-center mb-6">
                                <h6
                                    class="font-manrope font-semibold text-2xl leading-9 text-gray-900 pr-5 sm:border-r border-gray-200 mr-5">
                                    {product.price}   </h6>
                                <div class="flex items-center gap-2">
                                    
                                    <StarRating rating={product.rating.rate}/>
                                    <span class="pl-2 font-normal leading-7 text-gray-500 text-sm ">{product.rating.count}</span>
                                </div>
                        {/* TO CART */}
                            </div>
                            <p class="text-gray-500 text-base font-normal mb-5">
                                {product.description}  
                            </p>

                            <div className="text-xs mb-4   flex justify-center font-bold border-2 rounded-xl w-[70%] mx-auto transition duration-300">
  {product.totalNo > 0 ? (
    <div className="font-semibold text-sm">
      <div className="  rounded-md px-4 py-2 flex gap-3 items-center">
        <button onClick={decHandler} className="font-bold w-[1rem] h-[1rem]">
          <LuMinusCircle />
        </button>
        <p className="font-bold">{product.totalNo}</p>
        <button onClick={incHandler} className="font-bold w-[1rem] h-[1rem]">
          <HiOutlinePlusCircle />
        </button>
        {/* price */}
      </div>
    </div>
  ) : (
    <span onClick={addRemoveHandler} className="rounded-md px-4 py-2 w-full " >ADD TO CART</span>
  )}
</div>

 
                             
                            <div class="flex items-center gap-3">
                                <button
                                    class="group transition-all duration-500 p-4 rounded-full bg-indigo-50 hover:bg-indigo-100 hover:shadow-sm hover:shadow-indigo-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26"
                                        fill="none">
                                        <path
                                            d="M4.47084 14.3196L13.0281 22.7501L21.9599 13.9506M13.0034 5.07888C15.4786 2.64037 19.5008 2.64037 21.976 5.07888C24.4511 7.5254 24.4511 11.4799 21.9841 13.9265M12.9956 5.07888C10.5204 2.64037 6.49824 2.64037 4.02307 5.07888C1.54789 7.51738 1.54789 11.4799 4.02307 13.9184M4.02307 13.9184L4.04407 13.939M4.02307 13.9184L4.46274 14.3115"
                                            stroke="#4F46E5" stroke-width="1.6" stroke-miterlimit="10"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>

                                </button>
                                <button
                                    class="text-center w-full px-5 py-4 rounded-[100px] bg-indigo-600 flex items-center justify-center font-semibold text-lg text-white shadow-sm transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-400">
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </section>

            <div
                    className=" pt-14 flex-row flex-wrap justify-center  items-center gap-7  "
                >
                    <h1 className=" font-semibold text-3xl" >Similar projects</h1>
                    <div
                    className=" mt-10 mx-auto w-[5rem] h-[1.5px] bg-sky-500 mb-7 "
                ></div>

                    <div
                        className="flex py-14 flex-row flex-wrap justify-center  items-center gap-7  "
                    >
                    {
                        newList 
                        .map(item => <ProductCard key={item.id} item={item} />)
                    }
                    </div>
                </div>

            </div>
            
                                    
        
        }
    </div>

    )

}
export default ProductDetails;