import React, { useEffect, useRef, useState } from 'react';
import './Chat.css';
import img from './../../assets/vod.png';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Chat({ card }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const sendMessage = () => {
    const newMessageObj = {
      text: newMessage,
      file: selectedFile,
    };

    setMessages([...messages, newMessageObj]);
    setNewMessage('');
    setSelectedFile(null);

    if (selectedFile) {
      sendFile(selectedFile);
    }
  };

  const sendFile = (file) => {
    // Faylni serverga yuborishni o'zgartiring
    // Faylning server tomonidan qabul qilinishi va URL ni olish

    // Misol: Fayl yuborildikdan so'ng, server qaytaradi:
    const serverFileUrl = 'https://example.com/uploads/your-file.pdf'; // Fayl URL si

    // Fayl URL sini saqlang
    setFileUrl(serverFileUrl);
  };


  const tokenw = localStorage.getItem('accessToken');
  const userID = localStorage.getItem('userID')
  const getCommet = async () => {
    const response = await axios.get(`https://manager.zafarr.uz/routers/comments/card/${card.id}/`,
      {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Token ${tokenw}`,
        },
      }
    )
    setMessages(response.data);
    console.log(response.data);
  }

  useEffect(() => {
    getCommet()
  }, [])

  // add commit

  const messageValue = useRef()
  const fileValue = useRef()
  const {boardId} = useParams()

  const postCommit = async () => {
    try {
      const formData = new FormData();
      formData.append('text', messageValue.current.value);
      formData.append('card', card.id);
      formData.append('user', userID);
  
      // Faylni tekshirish
      if (fileValue.current.files.length > 0) {
        formData.append('file', fileValue.current.files[0]); // Faylni olish
      }
    
      await axios.post(
        `https://manager.zafarr.uz/routers/comments/card/post/${card.id}/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Fayl yuborish uchun bu kerak
            Authorization: `Token ${tokenw}`,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  
    // getUsername 
    const [userInfos , setUserInfos] = useState([])
    const getUserInfo = async () => {
        const response = await axios.get(`https://manager.zafarr.uz/routers/userprofile/${userID}/`)
        setUserInfos(response.data)
    }

    useEffect(() => {
      getUserInfo()
    }, [])


  return (
    <div className='ChatInfo'>
      <div className="chat-box">
        {messages.map((message, index) => (
          <div key={index} className="message">
            <div className="user-name">
              <img src={message.user[0].profile_image} alt="img" />
              <div className="TextComment">
                <p>{message.user[0].first_name} {message.user[0].last_name}</p>
                <p id='text'>{message.text}</p>
                {message.file && (
                  <div>
                    <a href={message.file} target="_blank" rel="noopener noreferrer">{'Filne Korish'}</a>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="message-input">
        <img src={img} alt="img" />
        <input className='Habar' ref={messageValue} type="text" placeholder="Xabar kiritish..." value={newMessage} onChange={handleMessageChange} />
        <input className='HabarFile' ref={fileValue} type="file" onChange={handleFileChange} />
        <button onClick={() => postCommit()}>Yuborish</button>
      </div>
    </div>
  );
}

export default Chat;
