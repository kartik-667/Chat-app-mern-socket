import {create} from 'zustand';
import axiosInstance from '../lib/axios.js';
import toast from 'react-hot-toast';
import axios from 'axios';

export const useChatstore=create((set,get)=>({
    messages:[],
    users:[],
    selectedUser:null,
    isuserloading:false,
    ismessageloading:false,

    getUsers:async ()=>{
        set({isuserloading:true})

        try {
            const res=await axiosInstance.get("/message/users")
            set({users:res.data})
            


            
        } catch (error) {
            toast.error(error.response.data.message)
            
        }finally{
            set({isuserloading:false})

        }
    },

    getMessages:async (userId)=>{
        set({ismessageloading:true})
        try {
            const res=await axiosInstance.get(`/message/${userId}`)
            set({messages:res.data})
            
        } catch (error) {
             toast.error(error.response.data.message)
            
        }finally{
            set({ismessageloading:false})
        }


    },

    sendMessage:async (messagedata)=>{
        const {messages,selectedUser}=get()
        try{
            const res=await axiosInstance.post(`/message/send/${selectedUser._id}`,messagedata)
            set({messages:[...messages,res.data]})


        }catch(error){ 
             toast.error(error.response.data.message)
        }
        


    },

    setselecteduser: (sel_user)=> set({selectedUser:sel_user}),





}))

