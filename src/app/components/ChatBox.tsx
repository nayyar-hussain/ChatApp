import ChatboxChatBox from "./ChatboxChatBox";
import ChatBoxFriednsSecsion from "./ChatBoxFriednsSecsion";
import Navbar from "./Navbar";

export default async function () {
    return(
        <div>
            <Navbar/>
            <div className="flex ">
                <ChatBoxFriednsSecsion/>
                <ChatboxChatBox/>
            </div>
        </div>
    )
}