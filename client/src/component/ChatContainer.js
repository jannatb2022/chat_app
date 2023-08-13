import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { styled } from 'styled-components';
import Logout from './Logout';
import { v4 as uuidv4 } from "uuid";
import ChatInput from './ChatInput';

const ChatContainer = ({currentChat, socket}) => {
  const [message, setMessage] = useState([]);
  const [arrivalMessage, setArrival] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    async function receivedmsg (){
      const data = await JSON.parse(localStorage.getItem("chatuser"));

      const response = await axios.post("/getMessages", {
        from: data._id,
        to: currentChat._id
      });
      setMessage(response.data);
    };
    receivedmsg();
  }, [currentChat])
  
  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(
          localStorage.getItem("chatuser")
        )._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);
  const handleSendMsg = async (msg)=>{
    const data = await JSON.parse(localStorage.getItem("chatuser"));

    socket.current.emit("send-msg", {
      from: data._id,
      to: currentChat._id,
      msg: msg
    });

    await axios.post("/addMessages", {
      from: data._id,
      to: currentChat._id,
      message: msg
    });

    const msgs = [...message];
    msgs.push({fromSelf: true, message: msg});
    setMessage(msgs)
    

  }

    useEffect(() => {
      if(socket.current){
        socket.current.on("msg-receive", (msg)=>{
          setArrival({fromSelf: false, message: msg})
        } )
      }
    }, []);

    useEffect(() => {
      arrivalMessage && setMessage((prev)=> [ ...prev, arrivalMessage])
    }, [arrivalMessage])
    
    useEffect(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);


  return (

    
     <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt=""
            />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chat-messages">
        {message.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  )
}

export default ChatContainer

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;