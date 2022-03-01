import { authService, dbService } from "myBase";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react/cjs/react.development";

export default({refreshUser, userObj})=>{
    const history=useHistory();
    const [newDisplayName, setNewDisplayName]=useState(userObj.displayName);
    const onLogOutClick=()=>{
        authService.signOut()
        history.push("/");
    };
    const getMyTweets=async()=>{
        const tweets= await dbService
        .collection("tweets")
        .where("creatorId", "==", userObj.uid)
        .orderBy("creatorAt")
        .get();
        console.log(tweets.docs.map((doc)=>doc.data()));
    };
 
    const onChange=(event)=>{
        const{
            target:{value},
        }=event;
        setNewDisplayName(value);
    };
    const onSubmit= async (event)=>{
        event.preventDefault();
        if(userObj.displayName!==newDisplayName){
           await userObj.updateProfile({
                displayName: newDisplayName,
            });
            refreshUser();
        }
    };

    useEffect(()=>{
        getMyTweets();
    },[]);

    return (
    <>
    <form onSubmit={onSubmit}>
        <input 
        onChange={onChange} 
        type="text" 
        placeholder="Display Name"
        value={newDisplayName}
        />
        <input type="submit" value="Update Profile"/>
    </form>
        <button onClick={onLogOutClick}>Log out</button>
    </>);
};