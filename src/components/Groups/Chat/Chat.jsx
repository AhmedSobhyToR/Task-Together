import React, { useState, useEffect } from 'react';
import { getCookie } from '../cookieUtils';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './chat.css'; // Import your custom CSS
import io from 'socket.io-client';

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState(null);
  const groupId = getCookie("groupId");

  useEffect(() => {
    const token = getCookie("token");

    if (!token) {
      console.error("Token not found. Cannot establish WebSocket connection.");
      return;
    }

    const newSocket = io('https://task-together-2020.onrender.com', {
      query: { token },
      transports: ['websocket'],
    });

    newSocket.on('connect', () => {
      console.log("Connected to WebSocket server.");
      newSocket.emit('joinGroup', groupId);
    });

    newSocket.on('message', (data) => {
      setMessages(prevMessages => [ data,...prevMessages]);
      
    });

    newSocket.on(groupId, (data) => {
      setMessages(prevMessages => [data,...prevMessages]);
    });
    newSocket.on('disconnect', () => {
      console.log("Disconnected from WebSocket server.");
    });

    newSocket.on('connect_error', (err) => {
      console.error("WebSocket connection error:", err.message);
    });

    setSocket(newSocket);
    getMessages();

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };

  }, [groupId]);

  const getMessages = async () => {
    try {
      const response = await fetch(
        `https://task-together-2020.onrender.com/groups/${groupId}/messages?pageSize=25&page=1`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: `${getCookie("token")}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMessages(data.data.messages);
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const getCurrentTime = (timestamp) => {
    const now = new Date(timestamp);
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}, ${now.toDateString()}`;
  };
  const handleSendMessage = () => {

    if (input.trim() && socket) { 
      const newMessage = {
        groupID: getCookie("groupId"),
        content: input, 
      };
      socket.emit('message', JSON.stringify(newMessage));
      setInput("");
    }
  };

  return (
    <div className='group-abilities'>
  <div className="container-fluid h-100">
    <div className="row justify-content-center h-100">
      <div className="col-md-8 col-xl-6 chat">
        <div className="card">
          <div className="card-header messages_head">
            <div className="d-flex bd-highlight">
              <div className="img_cont">
                {/* <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img" alt="User" /> */}
              </div>
              <div className="user_info">
                <span>{getCookie("groupName")}</span>
              </div>
            </div>
            {/* <span id="action_menu_btn"><i className="fas fa-ellipsis-v"></i></span> */}
          </div>
          <div className="card-body messages_card_body">
            {messages.slice().map((message) => (
              <div key={message._id} className={`d-flex justify-content-start mb-4 ${message.sender.nickname === 'You' ? 'you' : 'them'}`}>
              
                <div className="msg_cotainer">
                <span className='messageSender'>{message.sender.nickname} </span>
                  
                  <span>{message.content}</span>
                  <span className="msg_time">{getCurrentTime(message.timestamp)}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="card-footer">
            <div className="input-group">
              <div className="input-group-append">
                {/* <span className="input-group-text attach_btn"><i className="fas fa-paperclip"></i></span> */}
                <input type="file" id="fileInput" style={{ display: 'none' }} />
              </div>
              <textarea
                className="form-control type_messages"
                placeholder="Type your message..."
                value={input}
                onChange={handleInputChange}
              ></textarea>
              <div className="input-group-append">
                <span className="input-group-text send_btn" onClick={handleSendMessage}><i className="fas fa-location-arrow"></i></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

   
  );
};

export default ChatComponent;