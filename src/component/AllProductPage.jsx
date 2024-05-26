
import { useState } from "react"; 
import { FaAnglesRight } from "react-icons/fa6";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import Navi from "./Navi";
function AllProductPage(params) {

    const [initialLoad,setInitialLoad] = useState(12); 
    const allProductsListDummy = useSelector((store) => store.userDetail.allProducts);

    function clickHandler() {
        setInitialLoad(initialLoad+4)
    }
    

    return (
        <div className="bg-gradient-to-r  from-blue-200 to-cyan-200"  >

            <Navi/>
 
            <div className=" pt-24 pb-8" >
            
            <h1 className=" font-semibold text-3xl" >Marvellous Products From Capital Shop</h1>
        </div>
        <div
            className=" w-[5rem] h-[1.5px] bg-sky-500 mb-7 mx-auto mt-2 "
        ></div>

            <div
                    className="flex flex-row w-[85%] py-7 mx-auto flex-wrap justify-center  items-center gap-7  "
                >
                    {
                        allProductsListDummy
                            .slice(0, initialLoad) // Extract the first 10 items
                            .map(item => <ProductCard key={item.id} item={item}
                                //  cartHandler={cartHandler}
                                 />)
                    }
                </div>
             <button onClick={clickHandler}
              className={` ${initialLoad === 20 ? 'hidden':''} flex w-full py-9  text-2xl items-center justify-center gap-4 font-semibold text-emerald-600 hover:text-sky-600 `} >
                More Products <FaAnglesRight/>
            </button>
        </div>
    )
}

export default AllProductPage;