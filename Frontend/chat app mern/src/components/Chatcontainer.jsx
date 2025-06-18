import React, { useEffect } from 'react'
import { useChatstore } from '../store/useChatstore.js'
import Chatheader from './smallcompo/Chatheader.jsx'
import Messageinput from './smallcompo/Messageinput.jsx'
import { useAuthstore } from '../store/useAuthstore.js'
import {datetime} from '../lib/util.js'


function Chatcontainer() {
  const {messages, selectedUser, ismessageloading,sendMessage,getMessages, subscribeToMessages, unsubscribeToMessages}= useChatstore()
  const {authUser}=useAuthstore()

  useEffect(() => {
    // if(!selectedUser?._id) return
    if(!selectedUser) return
    getMessages(selectedUser._id)
    subscribeToMessages()

    return ()=> unsubscribeToMessages();

  }, [getMessages, selectedUser._id, subscribeToMessages, unsubscribeToMessages])

  console.log(messages);
  
  

  if(ismessageloading) return <div>Loading...</div>

  return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <Chatheader></Chatheader>
      
    <div className='flex-1 overflow-y-auto p-4 space-y-4'>
    {messages.map((ele)=>
        <div key={ele._id} className={`chat ${ele.senderid ==authUser._id ? "chat-end" : "chat-start"} `}>
          <div className='chat-header mb-1'>
            <time datetime="" className='text-sm opacity-50 ml-1'>{datetime(ele.createdAt)}</time>
            
          </div>

          <div className='chat-bubble flex flex-col '>
            {ele.image && (
              <img src={ele.image}  alt="Attachment"  className="rounded-md mb-2 max-w-xs max-h-70 object-cover" />
            )}

            {ele.text && <p>{ele.text}</p>} 


          </div>


        </div>


    )}


    </div>

      <Messageinput></Messageinput>

    </div>
  )
}

export default Chatcontainer
