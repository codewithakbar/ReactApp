/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import MainCard from "../../companents/mainCards/MainCard";
import MainNav from "../../companents/mainNav/MainNav";
import Navbar from "../../companents/navbar/Navbar";
import TaskCard from "../../companents/taskCard/TaskCard";
import UserNav from "../../companents/userNav/UserNav";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UserCards from "./UserCards";


export default function Home() {

    const getUser = async () => {
        const response = await axios.get("https://manager.zafarr.uz/users/")
        setUserData(response.data)
    }

    useEffect(() => {
        getUser()
    }, [])


    const [userData, setUserData] = useState([])

    const [taskData, setTaskData] = useState([]);
    const token = localStorage.getItem('accessToken');
    const userID = localStorage.getItem('userID')

    const getBoard = async () => {
        try {
            const response = await axios.get(`https://manager.zafarr.uz/routers/user/boards/${userID}/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            });
            setTaskData(response.data);
        } catch (error) {
            console.error('Xatolik yuz berdi:', error);
        }
    }

    useEffect(() => {
        getBoard();
    }, []);



    return (
        <>
            <Navbar />
            <div className="mainCards">
                {
                    taskData.map(item => (
                        <Link>
                            <UserCards item={item} />
                        </Link>
                    ))
                }
            </div>
        </>
    )
}