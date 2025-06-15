import {create} from 'zustand';
import axiosInstance from '../lib/axios.js';
import toast from 'react-hot-toast';

//zustand is global state management, as a replacement
// to context api

export const useAuthstore=create((set)=>({
    authUser:null,
    issigningup:false,
    isloggingin:false,
    isupdatingprofile:false,
    ischeckingAuth:true,
    
    checkAuth: async ()=>{
        try {
            const res=await axiosInstance.get('/auth/check',{
                withCredentials:true
            })

            set({authUser:res.data})
            
        } catch (error) {
            console.log("some error occured",error.message);
            set({authUser:null})
            
        }finally{
            set({ischeckingAuth:false})
        }

    },

    signup:async (data)=>{
        try {
            set({issigningup:true})
            const res=await axiosInstance.post("/auth/signup",data)
            toast.success("Account created successfully !!!")
            set({authUser:res.data})
            
        } catch (error) {
            toast.error(error.response.data.message)
            
        }finally{
            set({issigningup:false})
        }
        
    },
    logout:async ()=>{
        try {
            const res=await axiosInstance.post("/auth/logout")
            toast.success("Logged out successfully")
            set({authUser:null})
            
        } catch (error) {
            toast.error(error.response.data.message)
            
        }
    }


}));