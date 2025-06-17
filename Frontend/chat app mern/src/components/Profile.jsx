import React, { useState } from 'react'
import { useAuthstore } from '../store/useAuthstore.js';

function Profile() {
    const {authUser,updateprofile}=useAuthstore()
    console.log(authUser);
    

    const [selectedimg, setselectedimg]=useState(null)

    const handleImageupload=async (e)=>{
        const file=e.target.files[0]
        if(!file) return

        const reader=new FileReader()
        
        reader.readAsDataURL(file)

        reader.onload = async ()=>{
            const base64image=reader.result
            setselectedimg(base64image)
            await updateprofile({profilepic:base64image})
        }

    }
    if (!authUser) {
  return <div className="text-center mt-10 text-xl text-white">Loading profile...</div>;
}

 return (
    <div className="max-w-md mt-10  flex flex-col gap-4 mx-auto bg-slate-600 shadow-lg rounded-2xl p-6 space-y-4">
        <div className="top flex flex-col justify-center items-center ">
        <h1 className='text-2xl'>Profile</h1>
        <h1>Your personal information </h1>

        </div>
      {/* Profile Image */}
      <div className="flex justify-center ">
        <div className="relative">
          <img
            src={selectedimg ||  authUser?.profilepic ||"/vite.svg"}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-primary"
          />
          {/* Optional Edit Icon */}
          <label className="absolute bottom-1 right-1 bg-base-200 rounded-full p-1 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536M4 13.5V19h5.5l9-9-5.5-5.5-9 9z" />
            </svg>
            <input type="file" className="hidden" id='image' accept='image/*' onChange={(e)=> handleImageupload(e)}/>
          </label>
        </div>
      </div>

      {/* Name and Email */}
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-semibold">Name: {authUser.name ?? "Username"}</h2>
        <h2 className="text-2xl">Email: {authUser.email ?? "email"}</h2>
      </div>

      {/* Account Info */}
      <div className="mt-4 border-t pt-4 text-sm text-gray-600">
        <p className='text-white'><span className="font-medium text-white">Account Created:</span> October 1, 2024</p>
      </div>
    </div>
  );

}

export default Profile
