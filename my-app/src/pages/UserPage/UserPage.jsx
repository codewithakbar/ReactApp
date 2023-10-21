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
    const [isLoading, setIsLoading] = useState(true); // Yangi stavka

    const [userData, setUserData] = useState([]);
    const [taskData, setTaskData] = useState([]);
    const token = localStorage.getItem('accessToken');
    const userID = localStorage.getItem('userID');

    const navigate = useNavigate();

    // const getUser = async () => {
    //     const response = await axios.get("https://manager.zafarr.uz/users/");
    //     setUserData(response.data);
    // }

    const getBoard = async () => {
        try {
            const response = await axios.get(`https://manager.zafarr.uz/routers/user/boards/${userID}/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            });
            setTaskData(response.data);
            setIsLoading(false); // Ma'lumotlar yuklandi
        } catch (error) {
            return null
            console.error('Error making request:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
            }
            setIsLoading(false); // Xatolik yuz berdi, ma'lumotlar yuklanmadi
        }
    }

    useEffect(() => {

        getBoard();
    }, []);

    if (isLoading) {
        return <p>Ma'lumotlar yuklanmoqda...</p>; // Ma'lumotlar yuklanishini kuzatamiz
    }

    return (
        <>
            <Navbar />
            <div className="mainCards">
                {taskData.map(item => (
                    <Link key={item.id} to={`/UserTaskInfo/${item.id}`}>
                        <UserCards item={item} />
                    </Link>
                ))}
            </div>
        </>
    )
}
