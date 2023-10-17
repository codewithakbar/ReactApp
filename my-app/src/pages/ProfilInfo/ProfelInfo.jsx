import './ProfelInfo.css';
import ava from './../../assets/vod.png';
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from '../../companents/navbar/Navbar'

export default function ProfelInfo() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (event) => {
                const imageUrl = event.target.result;
                setSelectedFile(file);
                setImageSrc(imageUrl);
            };

            reader.readAsDataURL(file);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userID')
        localStorage.removeItem('is_admin')
        localStorage.removeItem('secure_is_admin')
        window.location.reload()
    };

    const userID = localStorage.getItem('userID')
    const [userInfos, setUserInfos] = useState([])
    const getUserInfo = async () => {
        const response = await axios.get(`https://manager.zafarr.uz/routers/userprofile/${userID}/`)
        setUserInfos(response.data)
    }
    useEffect(() => {
        getUserInfo()
    }, [])

    // profil img change
    const tokenw = localStorage.getItem('accessToken');

    const imageChange = async () => {
        try {
            const formData = new FormData();
            formData.append('username', userInfos[0].username);
            formData.append('email', userInfos[0].email);
            formData.append('profile_image', selectedFile);
    
            const tokenw = localStorage.getItem('accessToken');
    
            const response = await axios.put(
                `https://manager.zafarr.uz/userprofiles/${userID}/`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        "Authorization": `Token ${tokenw}`,
                    },
                }
            );
            console.log(response.data);
            window.location.reload();
        } catch (error) {
            console.error("Error:", error);
        }
    };
    


    return (
        <>
            <div className="ProfelInfo">
                <Navbar />
                <div className="PersolalContainer">
                    <div className="PersonalTitle">
                        <h1>Personal Info</h1>
                    </div>
                    {
                        userInfos.map(item => (
                            <div className="PersonalInfoBox">
                                <div className="PersonalPhoto">
                                    <div className="NamePhoto">
                                        <p>PHOTO</p>
                                    </div>
                                    <div className="ImgPhoto">
                                        <div className="ImgPhotoBox">
                                            <img src={imageSrc || item.profile_image} alt="User's photo" />
                                        </div>
                                    </div>
                                    <div className="InputPhoto">
                                        <div>
                                            <label htmlFor="fileInput" className="custom-file-upload">Image</label>
                                            <input
                                                type="file"
                                                id="fileInput"
                                                style={{ display: 'none' }}
                                                onChange={handleFileChange}
                                            />
                                            {selectedFile && <p>Selected file: {selectedFile.name}</p>}
                                        </div>
                                    </div>
                                </div>
                                <div className="PersonalName">
                                    <div className="NameName">
                                        <p>NAME</p>
                                    </div>
                                    <div className="NameText">
                                        <p>{item.first_name} {item.last_name}</p>
                                    </div>
                                </div>
                                <div className="PersonalAdress">
                                    <div className="AdressName">
                                        <p>ADDRESS</p>
                                    </div>
                                    <div className="AdressEmail">
                                        <p>{item.email}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    <div className="LogAut">
                        <button onClick={handleLogout}>LogOut</button>
                        <button onClick={imageChange}>Saqlash</button>
                    </div>
                </div>
            </div>
        </>
    )
}
