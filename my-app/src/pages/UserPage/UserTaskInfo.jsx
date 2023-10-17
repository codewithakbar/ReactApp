/* eslint-disable react/jsx-key */
import { BiSolidLock } from 'react-icons/bi'
import { BsPlusLg } from 'react-icons/bs'
import { MdDescription } from 'react-icons/md'
import { GoKebabHorizontal } from 'react-icons/go'
import Navbar from '../../companents/navbar/Navbar'
import { useEffect, useRef, useState } from 'react'
import ava from './../../assets/vod.png';
import { ImEarth } from 'react-icons/im';
import { HiPencil } from 'react-icons/hi';
import { Menu } from '@mui/base/Menu';
import { MenuButton } from '@mui/base/MenuButton';
import { MenuItem } from '@mui/base/MenuItem';
import { Dropdown } from '@mui/base/Dropdown';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Chat from '../../companents/chat/Chat'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Card from '../TaskINfo/Card'
import List from '../TaskINfo/List'
import UserList from './UserList'


export default function UserTaskInfo() {

    const { id } = useParams()
    const [tasksChil, setTasksChil] = useState([])

    const getTask = async () => {
        const response = await axios.get(`https://manager.zafarr.uz/routers/lists/${id}`)
        setTasksChil(response.data)
    }

    useEffect(() => {
        getTask()
    }, [])

    const top100Films = [
        { label: 'Muhammad Komilov', year: 1994 },
        { label: 'Lionel Ranaldo', year: 1972 },
    ]

    const inputRef = useRef()
    const taskNameRef = useRef()
    const closeRef = useRef()
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);
    const setRef = useRef()
    const [editingTaskName, setEditingTaskName] = useState(""); // Yangi o'zgaruvchi
    const changeRef = useRef()


    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (event) => {
                const imageUrl = event.target.result;
                setSelectedFile(file);
                setImageSrc(imageUrl);
            }
        }
    };


    // list add

    const tokenw = localStorage.getItem('accessToken');

    const addList = async () => {
        try {
            const response = await axios.post(
                `https://manager.zafarr.uz/routers/list/`,
                {
                    title: taskNameRef.current.value,
                    board: id
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Token ${tokenw}`,
                    },
                }
            );
            console.log(response.data);
            window.location.reload()
        } catch (error) {
            console.error("Error:", error);
        }
    };


    const [boadUsers, setBoardUsers] = useState([])
    const BoardUsers = async () => {
        try {
            const response = await axios.get(`https://manager.zafarr.uz/routers/boards/${id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Token ${tokenw}`,
                    },
                }
            )
            setBoardUsers(response.data.user)
        } catch {
            // console.log("Error:", error);
        }
    }

    useEffect(() => {
        BoardUsers()
    }, [])

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        axios.get('your-api-endpoint')
            .then(response => {
                // Handle the successful response
                setData(response.data);
            })
            .catch(error => {
                if (error.response) {
                    // The request was made, but the server responded with a non-2xx status code
                    console.log('Error response status:', error.response.status);
                    console.log('Error response data:', error.response.data);
                } else if (error.request) {
                    // The request was made, but no response was received
                    console.log('No response received:', error.request);
                } else {
                    // Something happened in setting up the request that triggered an error
                    console.error('Request setup error:', error.message);
                }

                setError(error); // You can update the component state to handle errors
            });
    }, []);

    return (
        <>
            <Navbar />
            <div className="ProfileNav">
                <div className="profilNavLeft">
                    <div className="taskStatusSelect">
                        <button className='statusTaskBtn'>
                            <Dropdown className='hello'>
                                <MenuButton className='GlavBtn'><button className='dropOnBtn'><BiSolidLock /> <span>Private</span></button></MenuButton>
                                <Menu className='dropMenu1'>
                                    <div className="tskSelectorTitle">
                                        <h3>Visibility</h3>
                                        <p>Choose who can see this board</p>
                                    </div>
                                    <MenuItem className='dropBtn'>
                                        <ImEarth color='#61BD4F' />
                                        <span>Public</span>
                                        <p>Anyone can see this board. Only board members can edit</p>
                                    </MenuItem>
                                    <MenuItem className='dropBtn'>
                                        <BiSolidLock color='#EB5A46' />
                                        <span>Private</span>
                                        <p>Only board members can see and edit this board</p>
                                    </MenuItem>
                                </Menu>
                            </Dropdown>
                        </button>
                    </div>
                    <div className="userAdd">
                        <div className="userAdd__users">
                            {
                                boadUsers.map(item => (
                                    <img src={item.profile_image} alt="" />
                                ))
                            }
                        </div>
                        <div className="userAdd__userAdd">
                            <Dropdown>
                                <Menu>
                                    <MenuItem>
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            options={top100Films}
                                            sx={{ width: 300 }}
                                            renderInput={(params) => <TextField {...params} label="Users" />}
                                        />
                                    </MenuItem>
                                </Menu>
                            </Dropdown>
                        </div>
                    </div>
                </div>
                <div className="profilNavRight">
                    <button>2 user</button>
                </div>
            </div>
            <div className="tasks">
                {
                    tasksChil.map((taskItem, index) => (
                        <UserList
                            key={taskItem.id}
                            inputRef={inputRef}
                            editingTaskName={editingTaskName}
                            closeRef={closeRef}
                            setEditingTaskName={setEditingTaskName}
                            taskItem={taskItem}
                            id={id}
                            changeRef={changeRef}
                        />
                    ))
                }
                <div className="taskAddBtn">
                    {/* <div className="addMiniDesc" style={{ backgroundColor: "#F1F3F2" }}>
                        <input ref={taskNameRef} type="text" placeholder='Add another list' />
                        <button onClick={addList}><BsPlusLg /></button>
                    </div> */}
                </div>
            </div >
        </>
    )
}