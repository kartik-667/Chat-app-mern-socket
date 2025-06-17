import React from 'react'
import { useAuthstore } from '../store/useAuthstore.js'
import {Link} from 'react-router-dom'
function Navbar() {

  const {logout, authUser}=useAuthstore()


  return (
    <div>
        <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      
    </div>
    <Link to="/" className="btn btn-ghost text-xl">Chat app</Link>
  </div>
  <div className="navbar  lg:flex">
  </div>
  <div className="navbar-end">
    {authUser && (<>
     <ul className="menu menu-horizontal px-1">
      <li>

      <Link to="/setting">Settings</Link>
      </li>
      <li>
       
      <Link to="/profile">Profile</Link>
      </li>
    </ul></>)
    
  }
   {!authUser &&  (<>
    <Link to="/login" className='btn'>Login</Link>
    
     {/* <Link to="/login" >Login</Link> */}
   </>)}
   {authUser && (<>
    <button onClick={logout} className="btn">Logout </button>
   </>)}
   
  </div>
</div>
      
    </div>
  )
}

export default Navbar
