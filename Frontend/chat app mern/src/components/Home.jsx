import React from 'react'
import { useChatstore } from '../store/useChatstore.js'
import Sidebar from './Sidebar.jsx'
import NoChatSelected from './NoChatSelected.jsx'
import Chatcontainer from './Chatcontainer.jsx'

function Home() {

  const {selectedUser}=useChatstore()

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <Chatcontainer />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
