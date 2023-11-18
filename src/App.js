import { useEffect, useState } from "react";
import ChatContainer from "./ChatContainer";
import ChatList from "./ChatList";

function App() {
  // Requirements:
  // 1. Add left and right panes, 1 - ChatList, 2 - ChatContainer
  // 2. ChatList to display the chat-users/contacts, (profile-icon, name, last-message-preferrable)
  // 3. ChatPane should have an input sectiion and a section to show chat messages
  // 4. Mock sending & receiving messages

  const [currentChat, setCurrentChat] = useState(null)
  const [showAddUser, setShowAddUser] = useState(false)
  const [newuserName, setNewUserName] = useState('')
  const [UserChatHistory, updateUserChatHistory] = useState([
    {
      user_id: '1234',
      user_name: 'John',
      history: [
        {
          message_id: '12312',
          message: 'Hello JOhn sdfsf',
          created_at: '12/10/2023 09:123',
          type: 'sent'
        },
        {
          message: 'Hello JOhn sdfsf',
          created_at: '12/10/2023 09:123',
          type: 'received'
        },
        {
          message: 'Hello JOhn sdfsf',
          created_at: '12/10/2023 09:123',
          type: 'received'
        },
      ]
    },
    {
      user_id: '2345',
      user_name: 'Philly',
      history: [
        {
          message: 'Hello Ricksddff',
          created_at: '123124143'
        },
        {
          message: 'Hello JOhn sdfsf',
          created_at: '123124143'
        },
        {
          message: 'Hello JOhn sdfsf',
          created_at: '123124143'
        },
      ]
    },
    {
      user_id: '23456',
      user_name: 'Rebecca',
      history: [] 
    }
  ])


  // useEffect(() => {
  //   //
  // }, [JSON.stringify(UserChatHistory)])

  const selectChat = (user_id) => {
    const chat = UserChatHistory.find((chat) => chat.user_id === user_id)
    setCurrentChat(chat)
  }

  const sendMessage = (user_id, message) => {
    let currentDateTime = new Date()
    let messageObj = { message: message, created_at: `${currentDateTime.toLocaleDateString()} ${currentDateTime.toLocaleTimeString()}` , type: 'sent' }
    let userIdx = UserChatHistory.findIndex((user) => user.user_id === user_id)
    // UserChatHistory[userIdx].history = [ messageObj,...UserChatHistory[userIdx].history ]
    let newState = currentChat
    newState.history = [ messageObj,...newState.history ]
    setCurrentChat(newState)
    updateChatHistory(newState, currentChat.user_id)
    setTimeout(triggerReceivedMessage, 2000)
  }

  const deleteMessage = (message_id) => {
    let newChatHistory = []
    currentChat.history.forEach((e, idx) => {
      if (idx !== message_id) {
        newChatHistory.push(e)
      }
    })
    setCurrentChat({...currentChat, history: newChatHistory})
  }

  const triggerReceivedMessage = () => {
    let currentDateTime = new Date()

    let messageList = ['Hey how are you', 'This is great', 'Good Day', 'Hello', 'I am Dinesh']
    let randomIndex = Math.floor(Math.random() * messageList.length) - 1
    let messageObj = { message: messageList[randomIndex], created_at: `${currentDateTime.toLocaleDateString()} ${currentDateTime.toLocaleTimeString()}`, type: 'received' }
    let newState = currentChat
    newState.history = [ messageObj,...newState.history ]
    setCurrentChat(newState)
    updateChatHistory(newState, currentChat.user_id)
  }

  const updateChatHistory = (updatedChat, user_id) => {
    let newChatHistory = UserChatHistory.map(h => {
      if (h.user_id === user_id) {
        return updatedChat
      } else {
        return h
      }
    })
    updateUserChatHistory(newChatHistory)
  }

  const handleCreateChat = (newChatName) => {
    let chat = { user_id: 12414, user_name:  newChatName, history: [] }
    updateUserChatHistory([...UserChatHistory, {...chat}] )
    setCurrentChat(chat)
    setNewUserName('')
    setShowAddUser(false)
  }

  return (
    <div className="flex" style={{height: '100vh'}}>
      <ChatList createChat={() => setShowAddUser(true)} userList={UserChatHistory.map((item) => ({user_id: item.user_id, user_name: item.user_name}))} selectChat={selectChat}/>
      <ChatContainer sendMessage={sendMessage} currentChat={currentChat} deleteMessage={deleteMessage} />
      {showAddUser && <div className="h-36 w-36 z-30">
        <p>Enter User Name</p>
        <input value={newuserName} onChange={(e) => setNewUserName(e.target.value)} placeholder="name"/>
        <button onClick={handleCreateChat}>Start Chatting</button>
      </div>}
    </div>
  );
}

export default App;
