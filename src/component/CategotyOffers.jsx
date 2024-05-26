import { BsGlobeCentralSouthAsia } from "react-icons/bs";
import { FiMapPin } from "react-icons/fi";
import { RiDiscountPercentLine } from "react-icons/ri";
import { MdOutlineLockPerson } from "react-icons/md";

import CategotyOfferCard from "./CategoryOfferCard";

import women from "../assets/women.jpeg"
import men from "../assets/men.jpeg"
import jwellary from "../assets/offerJwell.jpg"


function CategotyOffers(params) {
    return (
        <div 
            className=" w-full px-[10%] bg-slate-100   py-16 "
        >


            <div
                className="flex flex-row  justify-between  flex-wrap py-7 "
            >

                <div 
                    className="flex flex-col items-center justify-center 
                        w-full md:w-[49%] lg:w-[24%] gap-4 p-5 
                    "
                >
                    <span 
                        className=" text-7xl md:text-5xl  "
                    ><BsGlobeCentralSouthAsia/></span>
                    <h3
                        className=" text-[1.2rem] font-semibold "
                    >Worldwide Shipping</h3>
                    <h4
                        className=""
                    >Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, nihil!</h4>
                </div>

                <div
                    className="flex flex-col items-center justify-center 
                    w-full md:w-[49%] lg:w-[24%] gap-4 p-5
                "
                >
                    <span
                        className=" text-7xl md:text-5xl  "
                    ><FiMapPin/></span>
                    <h3
                        className=" text-[1.2rem] font-semibold "
                    >Best Quality</h3>
                    <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, nihil!</h4>
                </div>

                <div
                    className="flex flex-col items-center justify-center 
                    w-full md:w-[49%] lg:w-[24%] gap-4 p-5
                "
                >
                    <span
                        className=" text-7xl md:text-5xl  "
                    ><RiDiscountPercentLine/></span>
                    <h3
                        className=" text-[1.2rem] font-semibold "
                    >Best Offer</h3>
                    <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, nihil!</h4>
                </div>

                <div
                      className="flex flex-col items-center justify-center 
                      w-full md:w-[49%] lg:w-[24%] gap-4 p-5
                  "
                >
                    <span
                        className=" text-7xl md:text-5xl  "
                    ><MdOutlineLockPerson/></span>
                    <h3
                        className=" text-[1.2rem] font-semibold "
                    >Secure Payment</h3>
                    <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, nihil!</h4>
                </div>
                
            </div>

            <div 
                className=" pb-3 w-full flex flex-row justify-center flex-wrap gap-3 "
            >   
                <CategotyOfferCard category="men's clothing" image={women}  />
                <CategotyOfferCard category="women's clothing" image={men} />
                <CategotyOfferCard category="jewelery" image={jwellary} /> 
            </div>

        </div>
    )
}
export default CategotyOffers;