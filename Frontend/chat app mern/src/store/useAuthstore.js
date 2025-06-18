import {create} from 'zustand';
import axiosInstance from '../lib/axios.js';
import toast from 'react-hot-toast';
import axios from 'axios';
import {io} from 'socket.io-client'

//zustand is global state management, as a replacement
// to context api

const BASE_URL="http://localhost:9000"



export const useAuthstore=create((set , get)=>({
    authUser:null,
    issigningup:false,
    isloggingin:false,
    isupdatingprofile:false,
    ischeckingAuth:true,
    onlineUsers:[],
    socket:null,
    
    checkAuth: async ()=>{
        try {
            const res=await axiosInstance.get('/auth/check',{
                withCredentials:true
            })

            

            set({authUser:res.data})
            get().connectSocket()
            
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
            get().connectSocket()
            
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

            get().disconnectSocket()
            
        } catch (error) {
            toast.error(error.response.data.message)
            
        }
    },
    login: async (data)=>{
        try {
            set({isloggingin:true})
            const res=await axiosInstance.post("/auth/login",data)
            
            toast.success("login successful")
            set({authUser:res.data})

            get().connectSocket()
            
        } catch (error) {
             const status = error?.response?.status;
             if(status ===404){
                toast.error("Account not found/Invalid credentials")
                
            }else if(status ===500){
                toast.error("some error occured"+error.message)

            }

            
        }finally{
            set({isloggingin:false})
            
        }

    },
    updateprofile:async (data)=>{
        set({isupdatingprofile:true})
        try {
            const res=await axiosInstance.put("/auth/updateprofile",data)
            toast.success("Profile updated successfully")
            set({authUser:res.data})

            
        } catch (error) {
             toast.error("Some error occured "+error.message)
            
        }finally{
            set({isupdatingprofile:false})
        }

    },

    connectSocket:()=>{
        const {authUser}=get()
        if(!authUser || get().socket) return

        const socket=io(BASE_URL,{
            query:{
                userId:authUser._id, //this sends data to backend along with socket
            }
        })
        socket.connect()

        set({socket:socket})

        socket.on("getOnlineUsers",(userIds)=>{
            set({onlineUsers:userIds})
        })

    },

    disconnectSocket:()=>{
        const {socket}=get()

        if(socket?.connected){
            socket.disconnect()
            console.log("socket disconnected");
            set({socket:null})
            
        }

        

    }


}));