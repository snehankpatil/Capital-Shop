import StarRating from "./StarRating";

import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useLocation } from 'react-router-dom';
import Loading from "./Loading";

import ProductCard from "./ProductCard";
import { setAllProducts } from "../redux/slice/User";
import { setCartData } from "../redux/slice/User"; 
import Navi from "./Navi";

function CategoryProducts(){
    const { category } = useParams();
    const allProductsListDummy = useSelector((store) => store.userDetail.allProducts);
    const filteredProducts = allProductsListDummy.filter(product => product.category === category);

    return (
        <div>

        <Navi/>
        <div className=" pt-24 pb-8" >
            
            <h1 className=" font-semibold text-3xl" >featured product from {category}</h1>
        </div>
        <div
            className=" w-[5rem] h-[1.5px] bg-sky-500 mb-7 mx-auto mt-2 "
        ></div>

        <div className="flex pb-12 flex-row flex-wrap justify-center  items-center gap-7  "
              >
            {
                filteredProducts // Adjust initialLoad to the number of items you want to display
                    .map(item => <ProductCard key={item.id} item={item} />)
            }
        </div>
        </div>
    )
}

export default CategoryProducts;