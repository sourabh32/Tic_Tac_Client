import React, { useState } from 'react'

const ChatBox = ({handleMesasge}) => {
    const [msg,setMessage] = useState("")
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <input
        value={msg}
        onChange={(e) => setMessage(e.target.value)}
        type="text"
        placeholder="Enter msg.."
        style={{ marginBottom: "10px", maxWidth: "300px" }}
    />

    <button
        onClick={() => {
            handleMesasge(msg);
        }}
        className="restart-btn"
        type="button"
        style={{ maxWidth: "100px" }}
    >
        Send
    </button>
</div>

  )
}

export default ChatBox