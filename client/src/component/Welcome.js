import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components';
import Robot from "../assets/robot.gif";

const Welcome = () => {
    const [user, setUser] = useState('');

    useEffect(() => {
        async function user(){
            setUser(await JSON.parse(localStorage.getItem('chatuser')).username);
        }
      user()
    }, []);
    
    
  return (
    <Container>
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{user}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
  
}

export default Welcome

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;