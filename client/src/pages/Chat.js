import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentchat, setCurrentChat] = useState(undefined);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    async function fdata() {
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
    fdata();
  }, []);

  useEffect(() => {
    async function fdata() {
      if (currentUser) {
        const data = await axios.get(`/allusers/${currentUser._id}`);
        setContacts(data.data);
      }
    };
    fdata();
  }, [currentUser]);
  console.log('ct', contacts);

  return <div>Chat</div>;
};

export default Chat;
