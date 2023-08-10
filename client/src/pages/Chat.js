import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState('');
  const [currentchat, setCurrentChat] = useState(undefined);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    async function f1data() {
      if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
        navigate("/login");
      } else {
        setCurrentUser(
          await JSON.parse(
            localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
          )
        );
      }
    }
    f1data();
  }, []);
  console.log("cu", currentUser);

  useEffect(() => {
    async function f2data() {
      if (currentUser) {
        const data = await axios.get(`/auth/allusers/64d47067f2aa47447a6e330b`);
        console.log('cdata', data);
        setContacts(data.data);
      }
    };
    f2data();
  }, []);
  console.log("ct", contacts);

  return <div>Chat</div>;
};

export default Chat;
