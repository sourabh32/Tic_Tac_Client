import React, { useState } from 'react'

const ChatBox = ({handleMesasge}) => {
    const [msg,setMessage] = useState("")
  return (
    <div style={{display:"flex",gap:"10px",alignItems:"center"}}>
        <input style={{width:"90%"}} value ={msg} onChange={(e) => setMessage(e.target.value)} type="text" placeholder='Enter msg..' />

        <button onClick={()=>{handleMesasge(msg)}} className='restart-btn' type="button">sends</button>
    </div>
  )
}

export default ChatBox