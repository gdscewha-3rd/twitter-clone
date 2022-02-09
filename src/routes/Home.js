import React from "react";
import { useState } from "react/cjs/react.development";

const Home=()=>{
    const[twitterclone, setTwitterclone]=useState("");
    const onSubmit=(event)=>{
        event.preventDefault();
    };
const onChange=(event)=>{
    const {target:{value}, }=event;
    setTwitterclone(value);
}
return (
<div>
    <form>
        <input value={twitterclone} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120}/>
        <input type="submit" value="twitter-clone"/>
    </form>
</div>
)
}
export default Home;