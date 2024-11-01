import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { getSocket } from "../socket/socket.client";
import { useAuthStore } from "./useAuthStore";

export const useMessageStore = create((set)=>({
    messages:[],
    loading:true,
    sendMessage:async(receiverId,content)=>{
        try {
            set(state=>({messages:[...state.messages,{_id:Date.now(),sender:useAuthStore.getState().authUser._id,receiver:receiverId,content }]}));
            const {data} = await axiosInstance.post('/messages/send',{receiverId, content});

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    },
    getMessages:async(userId)=>{
        try {
            set({loading:true})
            const {data} = await axiosInstance.get('/messages/conversation/'+userId);
            if(data.success){
                set({messages:data.messages});
            }
        } catch (error) {
            console.log(error);
            toast.error('Error in loading messages!');
            set({messages:[]});
        }finally{
            set({loading:false});
        }
    },
    subsribeToMessages: (userId)=>{
        try {
            const socket = getSocket();
            socket.on("newMessage",(message)=>{
                set((state)=>({messages:[...state.messages,message]}));
            })
        } catch (error) {
            console.log(error);
        }
    },
    unsubscribeToMessages: ()=>{
        try {
            const socket = getSocket();
            socket.off("newMessage");
          } catch (error) {
            console.log(error);
          }
    }

}))