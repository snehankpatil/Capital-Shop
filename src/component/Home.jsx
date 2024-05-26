import { useEffect,useState } from "react";

import { useDispatch,useSelector } from "react-redux";
import { setUserName } from "../redux/slice/User";

import axios from "axios";
import Navi from "./Navi";
// C:\Users\Snehank\Desktop\WEB DEV\integrated\second\client\src\assets\jwellary.jpg
import backImg from "../assets/imgBlue.png"
import { useNavigate } from "react-router";

function Home(params) {

    const username  = useSelector((state) => (state.userDetail.userName));
    const dispatch = useDispatch();

    const [prompt,setPromt] = useState("");
     const navi = useNavigate()
 

    return (
        <div >
            <Navi />

            <div className="relative w-full h-[100vh] flex flex-row justify-start items-center ">
                <img src={backImg} className="z-10 w-full h-[90vh] md:h-[100vh]  object-fill absolute top-0" />
                <div 
                    className="z-20  bg-opacity-100 text-white font-semibold relative ml-[15%] mr-[15%]
                        w-[40rem] space-y-5  ">
                    <h2  
                        className=" md:text-[3.5rem] text-[2.2rem] text-start font-bold  text-[amber-50] "
                    >Lorem ipsum dolor sit amet consectetur.</h2>
                    <h4
                        className=" md:text-[2.2rem]  text-[1.2rem] text-start  font-semibold text-[amber-50] "
                    >25% Off On Jwellary.</h4>
                    <div className="flex flex-row gap-4">
                        <button 
                            className="mt-4 px-[1.5rem] py-[0.5rem] text-[1.3rem] font-thin
                            bg-cyan-700 hover:bg-cyan-950 text-white rounded "
                            onClick={()=>(navi('/products/jewelery'))}
                        >Shop Now</button>

                        <button onClick={()=>(navi('/products'))}
                            className="mt-4 px-[1.5rem] py-[0.5rem] text-[1.3rem] font-thin
                            bg-slate-700 hover:bg-slate-900 text-white rounded bg-opacity-75"
                        >Find More</button>
                    </div>
                

                </div>
            </div>
 

        </div>
    );
}

export default Home;    