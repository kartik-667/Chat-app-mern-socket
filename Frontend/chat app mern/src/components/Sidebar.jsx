
import React, { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { useChatstore } from "../store/useChatstore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { useAuthstore } from "../store/useAuthstore";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setselecteduser, isuserloading } = useChatstore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const {onlineUsers}=useAuthstore()

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = users.map((ele) => {
    const tmp=ele
    tmp.name=tmp.name.charAt(0).toUpperCase() + tmp.name.slice(1)
    return tmp


  }); // No online filter applied
  

  if (isuserloading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
          

        </div>
        <span className="ml-8 text-sm">{onlineUsers.length-1} Online </span>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setselecteduser(user)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilepic || "/vite.svg"}
                alt={user.name}
                className="size-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900"></span>
              )}
              
            </div>

            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.name}</div>
              {onlineUsers.includes(user._id) ? <div className="text-sm text-zinc-400">Online</div> : <div className="text-sm text-zinc-400">Offline</div> }
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No users found</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
