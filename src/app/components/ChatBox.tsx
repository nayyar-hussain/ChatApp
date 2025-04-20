import ChatboxChatBox from "./ChatboxChatBox";
import ChatBoxFriednsSecsion from "./ChatBoxFriednsSecsion";

 function ChatBox () {
    return(
        <div>
           
            <div className="flex ">
                <ChatBoxFriednsSecsion/>
                <ChatboxChatBox/>
            </div>
        </div>
    )
}

export default ChatBox