

import { useEffect, useRef, useState,  } from 'react'
import './App.css'

function App() {
const [messages, setMessages] = useState(["Hii", "Welcome to chat room"]);

const wsRef = useRef<WebSocket | null>(null);

const inputRef = useRef<HTMLInputElement | null>(null);

useEffect(()=>{
  const ws = new WebSocket("wss://pingme-2.onrender.com");

  ws.onmessage = (event) =>{
    setMessages(m => [...m, event.data])
  }
  wsRef.current = ws;
  ws.onopen = ()=>{
    ws.send(JSON.stringify({
      type: "join",
      payload:{
        roomId: "red"
      }
    })) 
  }
}, []);

  return (
    <div className='h-screen bg-black'>
      <br/> <br/> <br/> <br/> <br/>
      <div className='h-[85vh]'>
        {messages.map(message => <div className='m-8'> <span className='bg-white text-blck rounded p-4'>
          {message}
          </span>
          </div>)}
      </div>
      <div className='w-full bg-white flex'>
       
        <input ref={inputRef} id="message" className="flex-1 p-4"></input>
        <button onClick={()=>{
          
          const message = inputRef.current?.value;
          
          wsRef.current?.send(JSON.stringify({
            type: "chat",
            payload:{
              message: message
            }
          }))
        }}  className='bg-purple-600 text-white p-4'>Send mesage</button>
      </div>

    </div>
  )
}

export default App
