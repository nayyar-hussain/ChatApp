import { Bell } from "lucide-react";
import Icons from "./Icons";
import UserNavIcon from "./UserNavIcon";

export default async function Navbar() {
  return (
    <div className="w-full flex justify-between items-center py-5 bg-[#5A8EFF] px-5">
        <UserNavIcon/>
        <Icons Icon={Bell}/>
    </div>
  )
}

