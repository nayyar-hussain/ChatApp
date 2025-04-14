import { Bell } from "lucide-react";
import Icons from "./Icons";
import UserNavIcon from "./UserNavIcon";
import FriendRequestBox from "./FriendRequestBox";

export default async function Navbar() {
  return (
    <div className="w-full flex justify-between items-center py-5 bg-[#5A8EFF] px-5">
        <UserNavIcon/>
        <div>

        <Icons Icon={Bell}/>
        <FriendRequestBox/>
        </div>
    </div>
  )
}

