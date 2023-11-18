import React, { useState } from 'react'

const ChatContainer = ({currentChat, sendMessage, deleteMessage}) => {

  const [message, setMessage] = useState('')
  const [showOptions, setShowOptions] = useState({ message_id: null, show: false })

  const ChatHistory = () => {
    return
  }

  const ChatInput = () => {
    return
  }

  const handleSendMessage = () => {
    if (!message) return;

    sendMessage(currentChat.user_id, message)
    setMessage('')
  }

  const handleInput = (e) => {
    setMessage(e.target.value)
  }

  const handleShowOptions = (index) => {
    setShowOptions(showOptions.message_id === index ? { show: false, message_id: null } :  { show: true, message_id: index })
  }

  return (
    <div className='h-full w-full'>
      { currentChat && <div className='fixed top-0 h-8 bg-gray-600 w-full'>{currentChat.user_name}</div> }
      <div className='pt-8 h-full flex flex-col overflow-y-scroll'>
      { currentChat && currentChat.history.map((chat, index) => (
        <div onClick={() => handleShowOptions(index)} key={index} className={`w-full flex items-end my-3 text-${chat.type === 'sent' ? 'green-500' : 'blue-400'}`}>
          <p>{chat.message} <span className='text-gray-400 text-sm'>{chat.type}</span></p>
          {
            showOptions.message_id === index && showOptions.show &&
            <div className='text-sm'>
              <p>timestamp: {chat.created_at}</p>
              { chat.type === 'sent' && <button className='text-red-500' onClick={() => deleteMessage(index)}>Delete Message</button> }
            </div>
          }
        </div>
      ))}
      </div>
      <div className='fixed bottom-0 h-8 w-full flex'>
        <input onChange={handleInput} value={message} className='h-full' type={'text'} placeholder='Enter message' />
        <button className='h-5 w-10' onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  )
}

export default ChatContainer