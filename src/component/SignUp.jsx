
import { useEffect, useState } from "react"; 
import axios from 'axios';
import { useNavigate } from "react-router";
import { setUser } from "../redux/slice/User";
import { useDispatch } from "react-redux";

function SignUp(){

     
    const navi = useNavigate();

    const [userData, setUserData] = useState({
        id: "", username: "", password: "", firstName: "", lastName: "",
        country: "", streetAddress: "", state: "", zipcode: "", city: "",
        mobile_no: "", gender: ""
    });

    const [promt,setPromt] = useState("");
    const [show ,setShow] = useState(false);

    function changeHandler(event) {
        const { id, value } = event.target;

        setUserData(prev => ({
            ...prev, [id]: value
        }));
    }

    function checkHandler(event){
        event.preventDefault();
        const {id,username,password,mobile_no,gender} = userData;
        console.log(userData);
        axios.post('/api/v1/checkUser', {
            id, username, password, gender, mobile_no,
        })
        .then(response => {
            // This block will be executed for status codes from 200 to 299
            console.log('Success:', response.data);
            setPromt(response.data.message);  // Assuming response.data.message contains the success message
            // navi('/')
            if(response.data.success){ 
                setShow(true);
            }

        })
        .catch(error => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log('Error:', error.response.status, error.response.data);
                setPromt(error.response.data.message || 'An error occurred');  // Display server-provided error or a default message
            } else if (error.request) {
                // The request was made but no response was received
                console.log('Error:', error.request);
                setPromt('No response from server');  // Handle no response situation
            } else {
                // Something happened in setting up the request that triggered an error
                console.log('Error', error.message);
                setPromt('Error during request setup');
            }
        });
        
       
    }

    const dispatch = useDispatch();

    function submitHandler(event){
        event.preventDefault();
        const {id, username,password, firstName, lastName, country, streetAddress, state, zipcode, city, mobile_no, gender} = userData;
        console.log(id, username, firstName, lastName, country, streetAddress, state, zipcode, city, mobile_no, gender);
        axios.post('/api/v1/signUp', {
            id, username, password, firstName, lastName,
            country, streetAddress, state, zipcode, city,
            mobile_no, gender
        })
        .then(response => {
            // This block will be executed for status codes from 200 to 299
            console.log('printing after creating the uset:', response.data);
            setPromt(response.data.message);  // Assuming response.data.message contains the success message
            // navi('/')
            dispatch(setUser(response.data.data))
            navi('/')

        })
        .catch(error => {
            // if (error.response) {
            //     // The request was made and the server responded with a status code
            //     // that falls out of the range of 2xx
            //     console.log('Error:', error.response.status, error.response.data);
            //     setPromt(error.response.data.message || 'An error occurred');  // Display server-provided error or a default message
            // } else if (error.request) {
            //     // The request was made but no response was received
            //     console.log('Error:', error.request);
            //     setPromt('No response from server');  // Handle no response situation
            // } else {
            //     // Something happened in setting up the request that triggered an error
            //     console.log('Error', error.message);
            //     setPromt('Error during request setup');
            // }
        });
    }

    const [tempPass,setTempPass] = useState("");
    function setPassHandler(event){
        const {id,value} = event.target;
        setTempPass(value);
    }

    const [confPass,setConfPass] = useState("");
    function confPassHandler(event){
        const {id,value} = event.target;
        setConfPass(value);
    }

    const [isMatch,setIsMatch] = useState(true);
    
    useEffect(()=>{
        if(tempPass === confPass){
            setIsMatch(true); 
        }
        else{
            setIsMatch(false); 
        }
        const password ="password";

        setUserData((prev)=>{
            return {
                ...prev , [password]:tempPass
            }
        })

    },[tempPass,confPass])

    return (
        <div className="w-[70%] mx-auto">
            <form onSubmit={checkHandler} className={`w-[70%] mx-auto ${show ? 'hidden' : 'block'} transition-colors duration-300`}>
                <h3>Create Your account</h3>
    <label>
        <p className="text-md text-indigo-500 font-semibold pb-1 pt-4 text-start">Email <span className="mx-1 text-red-600 inline">*</span></p>
        <input type="email" placeholder="xyz@email.com" id="id" required onChange={changeHandler} className="border p-2 rounded w-full" />
    </label>
    <label>
        <p className="text-md text-indigo-500 font-semibold pb-1 pt-4 text-start">Set Username <span className="mx-1 text-red-600 inline">*</span></p>
        <input type="text" placeholder="patil78" id="username" required onChange={changeHandler} className="border p-2 rounded w-full" />
    </label>
    <label>
        <p className="text-md text-indigo-500 font-semibold pb-1 pt-4 text-start">Set Password <span className="mx-1 text-red-600 inline">*</span></p>
        <input type="password" placeholder="enter the password" required onChange={setPassHandler} className="border p-2 rounded w-full" />
    </label>
    <label>
        <p className="text-md text-indigo-500 font-semibold pb-1 pt-4 text-start">Confirm Password <span className="mx-1 text-red-600 inline">*</span></p>
        <input type="password" placeholder="enter the password" required onChange={confPassHandler}
            className={`border p-2 rounded w-full ${isMatch ? 'bg-green-50' : 'bg-red-50'}`} />
    </label>
    <label>
        <p className="text-md text-indigo-500 font-semibold pb-1 pt-4 text-start">Mobile No <span className="mx-1 text-red-600 inline">*</span></p>
        <input type="tel"
 
  name="mobileNumber"
  placeholder="Enter your mobile number"
  maxLength="10" // Assuming 10 digits for a mobile number
  pattern="[0-9]{10}" // Only allow numeric characters and exactly 10 digits
  title="Please enter a 10-digit mobile number"
  required // Make the field required
   id="mobile_no"  onChange={changeHandler} className="border p-2 rounded w-full" />
    </label>
    <button disabled={!isMatch} className={`px-4 py-2 mt-7 rounded ${isMatch ? 'bg-green-500' : 'bg-slate-400'} text-white  focus:outline-none transition-colors`}>
        Next 
    </button>
    <div>{promt}</div>
            </form>

            <div className={`bg-gray-100 ${show ? 'block' : 'hidden'} transition-colors duration-300`}>
                <div className="container mx-auto p-4">
                    <div className="bg-white shadow rounded-lg p-6">
                        <h1 className="text-xl font-semibold mb-4 text-gray-900">Personal Information</h1>
                        <p className="text-gray-600 mb-6">Use a permanent address where you can receive mail.</p>
                        <button onClick={() => setShow(false)}>Back</button>
                        <form onSubmit={submitHandler} >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <label>
                                    <p className="fles text-md text-indigo-500 font-semibold pb-1 pt-4 text-start">First name <span className="mx-1 text-red-600 inline">*</span></p>
                                    <input onChange={changeHandler} type="text" placeholder="First name" className="border p-2 rounded w-full" id="firstName" />
                                </label>
                                <label>
                                    <p className="fles text-md text-indigo-500 font-semibold pb-1 pt-4 text-start">Last name <span className="mx-1 text-red-600 inline">*</span></p>
                                    <input onChange={changeHandler} type="text" placeholder="Last name" className="border p-2 rounded w-full" id="lastName" />
                                </label>
                            </div>
                            <div className="mb-4">
                                <p className="fles text-md text-indigo-500 font-semibold pb-1 pt-4 text-start">Country <span className="mx-1 text-red-600 inline">*</span></p>
                                <select className="border p-2 rounded w-full" id="country" onChange={changeHandler}>
                                    <option value="">Select Country</option>
                                    <option value="India">India</option>
                                    {/* Add more countries as needed */}
                                </select>
                            </div>
                            <div className="mb-4">
                                <p className="fles text-md text-indigo-500 font-semibold pb-1 pt-4 text-start">Gender <span className="mx-1 text-red-600 inline">*</span></p>
                                <select className="border p-2 rounded w-full" id="gender" onChange={changeHandler}>
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Transgender">Transgender</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <p className="fles text-md text-indigo-500 font-semibold pb-1 pt-4 text-start">Street address <span className="mx-1 text-red-600 inline">*</span></p>
                                <input onChange={changeHandler} type="text" placeholder="Street address" className="border p-2 rounded w-full" id="streetAddress" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <label>
                                    <p className="fles text-md text-indigo-500 font-semibold pb-1 pt-4 text-start">City <span className="mx-1 text-red-600 inline">*</span></p>
                                    <input onChange={changeHandler} type="text" placeholder="Banglore" className="border p-2 rounded w-full" id="city" />
                                </label>
                                <label>
                                    <p className="fles text-md text-indigo-500 font-semibold pb-1 pt-4 text-start">State <span className="mx-1 text-red-600 inline">*</span></p>
                                    <input onChange={changeHandler} type="text" placeholder="Maharashtra" className="border p-2 rounded w-full" id="state" />
                                </label>
                                <label>
                                    <p className="fles text-md text-indigo-500 font-semibold pb-1 pt-4 text-start">Zipcode <span className="mx-1 text-red-600 inline">*</span></p>
                                    <input onChange={changeHandler} type="text" placeholder="416302" className="border p-2 rounded w-full" id="zipcode" />
                                </label>
                            </div>
                            <button  className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none transition-colors">
                                Submit
                            </button>
                        </form>
                        <div>{promt}</div>
                    </div>
                </div>
            </div>
        </div>
           
    );
}

export default SignUp;