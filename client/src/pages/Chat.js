import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Contacts from "../component/Contacts";
import Welcome from "../component/Welcome";
import { styled } from "styled-components";
import ChatContainer from "../component/ChatContainer";
import { io } from "socket.io-client"


const Chat = () => {
  const navigate = useNavigate();
  
  const [currentUser, setCurrentUser] = useState("");
  const [currentchat, setCurrentChat] = useState(undefined);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    async function f1data() {
      if (!localStorage.getItem('chatuser')) {
        navigate("/login");
      } else {
        setCurrentUser(
          await JSON.parse(
            localStorage.getItem('chatuser')
          )
        );
      }
    }
    f1data();
  }, []);
  console.log("cu", currentUser);

  useEffect(() => {
   if(currentUser){
    const socket = io("http://localhost:8080/api/");
    socket.emit("add-user", currentUser._id)
   }
  }, [currentUser])
  

  useEffect(() => {
    async function f2data() {
      if (currentUser) {
        const data = await axios.get(`/auth/allusers/${currentUser._id}`);
        console.log("cdataa", data);
        setContacts(data.data.users);
      }
    }
    f2data();
  }, [currentUser]);
  console.log("ct", contacts);

  const changeChat = (chat) => {
    setCurrentChat(chat)
  }

  return (<>
    <Container>
      <div className="container">
        <Contacts contacts={contacts} changechat={changeChat} />
        {currentchat === "" ? (
          <Welcome />
        ) : (
          <ChatContainer currentChat={currentchat}  />
        )}
      </div>
    </Container>
  </>);
};

export default Chat;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;