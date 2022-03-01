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
        if(user.displayName===null){
        const ind=user.email.indexOf("@")
        const end=user.email.substring(0, ind)
        user.updateProfile({displayName:end})
      }

        setUserObj({
          displayName:user.displayName,
          uid:user.uid,
          updateProfile:(args)=>user.updateProfile(args),
        });
      }
      else{
       setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  const refreshUser=()=>{
    const user=authService.currentUser;
    setUserObj({
      displayName:user.displayName,
      uid:user.uid,
      updateProfile:(args)=>user.updateProfile(args),
    });
  };
  
  return (
  <>
  {init ? (<AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj}/>): "Initializing . . . "}
  <footer>&copy; {new Date().getFullYear()} twitter-cloning</footer>
  </>
  )
    
}

export default App;
