import {create} from 'zustand';
import axiosInstance from '../lib/axios.js';

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


}));