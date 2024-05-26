// import logo from './logo.svg';
import './App.css';
 
import SignUp from './component/SignUp'
import LogIn from './component/LogIn' 
import ProductDetails from './component/ProductDetails';
 
import {Route,Routes} from "react-router-dom"
import AfterLogIn from './component/AfterlogIn';
import AllProductPage from './component/AllProductPage';
import CategoryProducts from './component/CategoryProducts';
import CustomerProfile from './component/CustomerProfile';
import Cart from './component/Cart';
function App() {

 
  return (
    <div className="App overflow-x-hidden">
      {/* <h4>PORTAL TO ADD THE TODOS</h4> */}
      <Routes>
          
          <Route path='/' element= {<LogIn/>} /> 
          <Route path='/signUp' element= {<SignUp/>} /> 
          <Route path='/home' element= {<AfterLogIn/>} /> 
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/user' element= {<CustomerProfile/>} /> 
          <Route path='/products' element= {<AllProductPage/>} /> 
          <Route path='/products/:category' element= {<CategoryProducts/>} /> 
          <Route path='/product/:title' element={<ProductDetails />} />

      </Routes>

      
    </div>
  );
}

export default App;
