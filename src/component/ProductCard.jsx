 
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { setAllProducts } from "../redux/slice/User";
import { setCartData } from "../redux/slice/User"; 

function ProductCard(props) {
//    price
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

    function addRemoveHandler(){
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
    let {category} = props.item;

    function clickHandler(){
        
        navi(`/product/${title}?id=${id}`); 
    }
    

    return (
        <div> 
            <div className="flex flex-col  pb-7  shadow-md border  rounded-lg p-5 justify-between h-[23rem] 
               lg:w-[15rem] md:w-[13rem]  w-[11rem] h hover:scale-105 duration-500  " 
            > 

                <h2 onClick={clickHandler}
                className=" text-green-700 text-xl font-semibold text-center h-[9%]  hover:cursor-pointer"
                >
                    {title.slice(0,10)}... 
                    
                </h2>

                <p  onClick={clickHandler}
                className=" text-neutral-400 text-xs  text-center  hover:cursor-pointer h-[18%]"
                >
                    { description.slice(0,75)}
                </p>

                <img src= { image} onClick={clickHandler}
                className=" object-contain h-[45%]  hover:cursor-pointer" />

                <div className="flex flex-row gap-5 justify-between items-center h-[9%] " >
                    <p onClick={clickHandler} 
                    className=" text-green-700 text-xl font-semibold" >
                        ${price}
                    </p> 
                    <span
                        className=" text-xs px-2 py-1 font-bold border-2 border-gray-800
                        rounded-xl hover:bg-slate-800 hover:text-gray-100 transition duration-00"
                        
                    >
                        {totalNo > 0? <div className=" font-semibold text-sm " >
                            <button onClick={incHandler} >+</button>
                            <span>...{newTotalNum}...</span>
                            
                            <button onClick={decHandler} >-</button>
                        </div>:<span onClick={addRemoveHandler} >ADD TO CART</span>}
                        
                    </span>



                </div>

                

            </div>
        </div>
    )
}
export default ProductCard;
