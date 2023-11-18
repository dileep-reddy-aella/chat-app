import React from 'react'

const ChatList = ({selectChat, userList, createChat}) => {

  return (
    <div className='h-full bg-gray-200 border border-r-2 py-4' style={{width: '30%'}}>
        {
          userList.map((user) => (
          <div key={user.user_id} onClick={() => selectChat(user.user_id)} className='max-h-min my-2 border border-black border-1 flex items-center'>
            <div className='h-8 w-8 rounded-full bg-black mr-4'>HD</div>
            <div>
              <p className=''>{user.user_name}</p>
              <p className='text-gray-400'>Hello john</p>
            </div>
          </div>
          ))
        }
        <button onClick={createChat}>Create New Chat</button>
    </div>
  )
}

export default ChatList