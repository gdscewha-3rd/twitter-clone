import React, { useEffect } from "react";
import AppRouter from "./Router";
import { useState } from "react";
import firebase, { authService } from "../myBase";

function App() {
  const [init, setInit]=useState(false);
  const [isLoggedIn, setIsLoggedIn]=useState(false);
  const[userObj, setUserObj]=useState(null);
  useEffect(()=>{
    authService.onAuthStateChanged((user)=>{
      if(user){
        setIsLoggedIn(true);
        setUserObj(user);
      }else{
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, [])
  
  return (
  <>
  {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/>: "Initializing . . . "}
  <footer>&copy; {new Date().getFullYear()} twitter-cloning</footer>
  </>
  )
    
}

export default App;
