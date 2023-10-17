import './nav.css'
import rmIcon from '../../assets/rm.svg'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useState, useEffect } from 'react';



export default function Navbar() {

    // getUsername 
    const userID = localStorage.getItem('userID')
    const [userInfos, setUserInfos] = useState([])
    const getUserInfo = async () => {
        const response = await axios.get(`https://manager.zafarr.uz/routers/userprofile/${userID}/`)
        setUserInfos(response.data)
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    return (
        <div className="navbar">
            <div className="navleft">
                <Link to={'/'}><img src={rmIcon} alt="" /></Link>
                <h3>Ranch Meneger</h3>
            </div>
            <div className="navRight">
                <Link to={'/Profil'}>
                    {
                        userInfos.map(item => (
                            <button className="userInfo" key={item.id}>
                                <img src={item.profile_image} alt="" />
                                <h5>{item.first_name == "" ? item.username : item.first_name} {item.last_name == "" ? item.username : item.last_name}</h5>
                            </button>
                        ))
                    }
                </Link>
            </div>
        </div>
    )
}