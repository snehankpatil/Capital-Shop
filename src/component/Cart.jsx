
import CartCard from "./CartCard";
import { useSelector } from "react-redux";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router";

function Cart(params) {
    const allProductsListDummy = useSelector((store) => store.userDetail.allProducts);
    const filteredProducts = allProductsListDummy.filter(product => product.inCart === true);

    const [totalPrice,setTotalPrice] = useState(0);
    const [totalProducts,setTotalProducts] = useState(0);
    const [totalItems,setTotalItems] = useState(0);

    const navi = useNavigate()
    useEffect(() => {
        let sumOfPrices = 0;
        let sumOfTotalNo = 0;
        let totalItemsNo = 0;
        filteredProducts.forEach(item => {
            if (item.totalNo > 0) {
                sumOfPrices += (item.price*item.totalNo);
                sumOfTotalNo += item.totalNo;
                totalItemsNo += 1;
            }
            setTotalPrice(sumOfPrices);
            setTotalProducts(totalItemsNo);
            setTotalItems(sumOfTotalNo);
        });
    },[filteredProducts])
    

    return (
        <div>
            {/* Add to Favorites */}
          <section class="bg-white py-8 antialiased md:py-16">
  <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
    <h2 class="text-xl font-semibold text-gray-900 sm:text-2xl">Shopping Cart</h2>

    <div class="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
      {/* <div class="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
       
        <div class="space-y-6">
           
          <div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6">
            <div class="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
              <a href="#" class="shrink-0 md:order-1">
                <img class="h-20 w-20" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-light.svg" alt="imac image" />
              </a>

              <label for="counter-input" class="sr-only">Choose quantity:</label>
              <div class="flex items-center justify-between md:order-3 md:justify-end">
                <div class="flex items-center">
                  <button type="button" id="decrement-button-2" data-input-counter-decrement="counter-input-2" class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100">
                    <svg class="h-2.5 w-2.5 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                    </svg>
                  </button>
                  <input type="text" id="counter-input-2" data-input-counter class="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0" placeholder="" value="1" required />
                  <button type="button" id="increment-button-2" data-input-counter-increment="counter-input-2" class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100">
                    <svg class="h-2.5 w-2.5 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                    </svg>
                  </button>
                </div>
                <div class="text-end md:order-4 md:w-32">
                  <p class="text-base font-bold text-gray-900">$598</p>
                </div>
              </div>

              <div class="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                <a href="#" class="text-base font-medium text-gray-900 hover:underline">Restored Apple Watch Series 8 (GPS) 41mm Midnight Aluminum Case with Midnight Sport Band</a>

                <div class="flex items-center gap-4">
                  

                  <button type="button" class="inline-flex items-center text-sm font-medium text-red-600 hover:underline">
                    <svg class="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                    </svg>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
          
        </div>
         
      </div> */}

      
      <div className="flex flex-row flex-wrap justify-center  items-center gap-7  "
              >
            {
                filteredProducts // Adjust initialLoad to the number of items you want to display
                    .map(item => <CartCard key={item.id} item={item} />)
            }
        </div>

        {/* summary */}
      <div class="mx-auto mt-6 min-w-[25rem] space-y-6 lg:mt-0 lg:w-full">
        <div class="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <p class="text-xl font-semibold text-gray-900">Order summary</p>

          <div class="space-y-4">
            <div class="space-y-2">
              <dl class="flex items-center justify-between gap-4">
                <dt class="text-base font-normal text-gray-500">Original price</dt>
                <dd class="text-base font-medium text-gray-900">${totalPrice}</dd>
              </dl>
             

              <dl class="flex items-center justify-between gap-4">
                <dt class="text-base font-normal text-gray-500">Total Products</dt>
                <dd class="text-base font-medium text-green-600">{totalProducts}</dd>
              </dl>

              <dl class="flex items-center justify-between gap-4">
                <dt class="text-base font-normal text-gray-500">Total Items</dt>
                <dd class="text-base font-medium text-gray-900">{totalItems}</dd>
              </dl>

             
            </div>

             
          </div>

          <a href="#" class="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300">Proceed to Checkout</a>

          <div class="flex items-center justify-center gap-2">
            <span class="text-sm font-normal text-gray-500"> or </span>
            <a href="#" onClick={()=>{navi("/products")}} title="" class="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline">
              Continue Shopping
              <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
              </svg>
            </a>
          </div>
        </div>

        {/* Tablet APPLE iPad Pro 12.9" 6th Gen, 128GB, Wi-Fi, Gold */}
      </div>

    </div>
  </div>
</section>

        </div>
    )
}

export default Cart;