
import { useNavigate } from "react-router";

function CategotyOfferCard(props) {

    const navi = useNavigate();

    function clickHandler() {
        console.log(props.category);
        navi(`/products/${props.category}`)
    }

    return (
        <div 
            className=" w-[90%] md:w-[49%] lg:w-[32%] md:h-[28rem] h-[18rem] 
              flex flex-col justify-end
            relative border border-white "
        >   
            <img src={props.image}
                className=" absolute w-full h-full z-0 "
            /> 
            <div
                className=" w-full h-full text-white z-20
                 p-9 gap-3 text-start  bg-slate-900 bg-opacity-15 hover:bg-opacity-5
                //   transition duration-200
                flex flex-col justify-end items-start"
            >
                <h3
                    className="  font-semibold text-2xl md:text-3xl "
                > Lorem ipsum dolor sit amet. </h3>
                <p
                     className=" font-thin text-sm "
                >Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, eos.</p>

                <button  onClick={clickHandler}
                        className="mt-4 px-[1.5rem] py-[0.5rem] text-[1.3rem] font-thin
                        rounded bg-slate-900 "
                > Shop Now</button>

            </div>
        </div>
    );
}

export default CategotyOfferCard;