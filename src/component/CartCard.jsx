import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { setAllProducts } from "../redux/slice/User";
import { setCartData } from "../redux/slice/User"; 
import { CiCircleMinus } from "react-icons/ci";
import { LuMinusCircle } from "react-icons/lu";
import { HiOutlinePlusCircle } from "react-icons/hi";


function CartCard(props){

    const dispatch = useDispatch();

    let {title, description,image,price,id,inCart,totalNo} = props.item;
    console.log(id,totalNo);
    const[newTotalNum,setTotalNum] = useState(totalNo);
    const [flag,setFlag] = useState(inCart);

    
    const [allProductsList, setAllProductsList] = useState([]);
    const [total,setTotal] =  useState(0); 
    const cartData = useSelector((store) => store.userDetail.cartData);
    const allProductsListDummy = useSelector((store) => store.userDetail.allProducts);

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
      
    
        if (totalNo === 0) {
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

                if(num == 0){
                    newCart[index][1] = 0;
                }
    
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
    
    useEffect(() => {
        setTotalNum(totalNo);  // Update state whenever totalNo prop changes
              // Update flag state whenever inCart prop changes
    }, [totalNo]);

    function  RemoveHandler(){
        let x =  cartHandler(id,0);
 
        // commentting it bcz it is handled by useefftect when valur of totalNo changes 
        // setTotalNum(x);
    }

    function incHandler(){
        console.log("increment",id)
        let x = cartHandler(id,1);
         
        // commentting it bcz it is handled by useefftect when valur of totalNo changes 
        // setTotalNum(x);
       
    }

    function decHandler(){
        console.log("decrement",id)
        let x = cartHandler(id,-1);
        
        // commentting it bcz it is handled by useefftect when valur of totalNo changes 
        // setTotalNum(x);
       
    }


    const navi = useNavigate(); 
    function clickHandler(){ 
        navi(`/product/${title}?id=${id}`); 
    }



    return (
        <div class="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
       
        <div class="space-y-6">
           {/* Remove */}
          <div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6">
            <div class="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
              
               <diV className=" w-[6rem]  " >
                <img src={image} alt="picture"
                    className=" w-[10rem] h-[10rem] object-contain "
                />
               </diV>

               <div class="flex flex-col  gap-3 ">
                    <div className=" flex items-center gap-4" >

                        <div className=" bg-slate-100 rounded-md px-2 py-1 flex gap-3 items-center" >
                        
                        <button onClick={decHandler}
                            className=" font-bold w-[1rem] h-[1rem]   "
                        >
                            <LuMinusCircle/>
                        </button>

                        <p  className=" font-bold  " >{totalNo}</p>
                        
                        <button onClick={incHandler} className=" font-bold w-[1rem] h-[1rem]   "  >
                            
                            <HiOutlinePlusCircle/>
                        </button>
                        </div>


                        <div class=" text-start md:order-4 md:w-32">
                            <p class=" font-bold text-gray-900">${price}</p>
                        </div>

                    </div>

                    <button onClick={RemoveHandler}
                    type="button" class="inline-flex items-center text-sm font-medium text-red-600 hover:underline">
                        <svg class="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                        </svg>
                        Remove
                    </button>


                </div>
               
              <div class="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                <a onClick={clickHandler} href="#" class="text-base font-medium text-gray-900 hover:underline">{title} </a>

                 
              </div>
              
            </div>
          </div>
          
        </div>
         
      </div>
    )

}

export default CartCard;