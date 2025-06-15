import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { useAuthstore } from '../store/useAuthstore.js'
// import {} from "../../public/"
function Signup() {
  const [showpass, setshowpass] = useState(false)
  const [userdata,setuserdata]=useState({
    name:"",
    email:"",
    password:"",
  })

  const {signup}=useAuthstore()


  const handleFormSubmit= (e)=>{
    try {
      
      e.preventDefault()
      if(!userdata.name || !userdata.password || !userdata.email){
        throw new Error("Data is missing")
        toast.error("Data is missing")
        return
      }
      if(userdata.password.length < 5){
        toast.error("Password must be atleast 5 characters")
        return
      }
      // console.log('form was submitted');
      // console.log('the data is',userdata);
      // toast.success("Form submitted successfully !")
      signup(userdata)
    } catch (error) {
      console.log("some error occured",error);
      toast.error("Data is missing")
      
      
    }
    
    
  }



  return (
    // <div><Toaster/></div>
    <div className='flex flex-col items-center'>
      {/* <h1>this is the signup page</h1> */}
      <h1>Signup on this page</h1>
      <form onSubmit={(e)=>handleFormSubmit(e)} action="" className='flex flex-col  items-center p-8 border border-white h-full w-4/5'>
        <div className="tops pb-4 flex flex-col justify-center items-center gap-2">

      <h1 className='text-5xl'>Create account</h1>
      <h1 className='text-1xl'>Get started with your free account</h1>
        </div>


        <fieldset className="">
  {/* <legend className="fieldset-legend">What is your name?</legend> */}
   <label htmlFor="name" className='block'>Your name </label>
  <input  value={userdata.name} name='name'onChange={(e)=> setuserdata({...userdata,name:e.target.value})}  type="text" className="input w-full" placeholder="Type here" />
</fieldset>
<br />

      <label htmlFor="mail" className='block'>Enter email </label>
    <label className="input validator">

  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
    </g>
  </svg>
  <input id='mail' value={userdata.email} onChange={(e)=> setuserdata({...userdata,email:e.target.value})} name='email' type="email" placeholder="mail@site.com" required />
</label>
<div className="validator-hint hidden">Enter valid email address</div>
<br />

<fieldset className="fieldset ">
  <legend className="fieldset-legend">Enter password</legend>
  <div className="flex items-center gap-2">
    <input name='password' value={userdata.password} onChange={(e)=> setuserdata({...userdata, password:e.target.value})} type={showpass ? "password":"text"} className="input flex-1" placeholder="Type here" />
    <button onClick={()=> setshowpass(!showpass)} type="button">
      <svg  className='h-7 w-7 bg-white rounded-md' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g strokeWidth="0"></g>
        <g strokeLinecap="round" strokeLinejoin="round"></g>
        <g>
          <path d="M2 2L22 22" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M14 14.2362C13.4692 14.7112 12.7684 15.0001 12 15.0001C10.3431 15.0001 9 13.657 9 12.0001C9 11.1764 9.33193 10.4303 9.86932 9.88818" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        </g>
      </svg>
    </button>
  </div>
</fieldset>
<br />
<button  type='submit'  className="btn btn-primary w-1/4">Submit</button>

<h1 className='mt-4'>Already have an account ? <Link to="/login" href="" className='hover:underline text-blue-500'>Login here</Link></h1>




      </form>
    </div>
  )
}

export default Signup
