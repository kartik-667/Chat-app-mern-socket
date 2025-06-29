import { X } from "lucide-react";
import { useChatstore } from "../../store/useChatstore.js";
import {useAuthstore} from '../../store/useAuthstore.js'


const Chatheader = () => {
  const { selectedUser, setselecteduser } = useChatstore();
  const { onlineUsers } = useAuthstore();

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={selectedUser.profilepic || "/avatar.svg"} alt={selectedUser.name} />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser.name}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setselecteduser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};
export default Chatheader;