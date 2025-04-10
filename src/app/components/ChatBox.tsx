import ChatboxChatBox from "./ChatboxChatBox";
import ChatBoxFriednsSecsion from "./ChatBoxFriednsSecsion";
import Navbar from "./Navbar";

 function ChatBox () {
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

export default ChatBox