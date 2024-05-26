
// function DetailedProductPage(params) { 
//     return (
//         <div>   
//                 <div className="lg:flex lg:flex-row flex flex-col justify-center items-center 
//                 space-x-9 p-5 lg:pb-20  text-black border-b-2 bottom-[-1rem] b border-zinc-300 relative gap-6   ">

//                     <div>
//                         <img src={image} alt="image is here"
//                             className= "lg:w-[30rem] md:w-[23rem] max-w-[15rem]   rounded-lg border-gray-500 overflow-hidden object-contain" 
//                         />
//                     </div>

//                     <div className=" flex flex-col space-y-4  lg:items-stretch  items-center justify-around mr-4 " >

//                         <h2 className="t text-xl font-bold" >
//                             {title}
//                         </h2>
//                         <p  className="text-[1.10rem] lg:text-start text-center">
//                             {description.slice(0,150)}...
//                         </p>
        
//                         <div className="flex flex-row justify-between items-center" >
//                             <p className="t text-xl font-bold text-emerald-700">
//                             Price: ${price}
//                             </p>
        
                            
        
        
        
//                         </div>

//                         <div className="flex flex-row justify-between items-center" >

//                             <p className="t text-xl font-bold text-emerald-700">
//                                 Rating: {rating.rate}/5.0

//                             </p>
                            
        
//                             <div   className="t text-xl font-bold p-1   text-emerald-700
//                                 ml-12 "
//                             >
//                                 Total Purchase: {rating.count} 
//                             </div>
        
        
        
//                         </div>
                        
//                     </div>
                    
//                     <button
//                         className={`px-5 text-lg py-1  lg:absolute bottom-3 right-5 bg-gradient-to-r from-violet-600 to-indigo-600
//                         r rounded-md  flex items-center space-x-5 hover:opacity-90
//                         text-white font-semibold ${isClicked ? 'hidden':''} `}
//                         onClick={btnClickHandler}
//                         id={category}

//                     > 
//                         More in {category}
//                         <CgMoreO className=" font-extrabold ml-3 "/>
//                     </button>

//                     <button
//                         className={`px-5 text-lg py-1  lg:absolute bottom-3 right-5 bg-gradient-to-r from-violet-600 to-indigo-600
//                         r rounded-md  flex items-center space-x-5 hover:opacity-90
//                         text-white font-semibold ${isClicked ? '':'hidden'}  `}
//                         onClick={btnClickHandler}
//                         id={category}
//                     > 
//                         View less 
                        
//                         <FaCaretUp className=" font-extrabold ml-3 "/>
//                     </button>
//                 </div>
//         </div>
//     ) 
// }

// export default DetailedProductPage;