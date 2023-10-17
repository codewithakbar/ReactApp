import axios from "axios";
import { useState, useEffect } from "react";
import { ImEarth } from 'react-icons/im';
import { HiPencil } from 'react-icons/hi';
import { Menu } from '@mui/base/Menu';
import { MenuButton } from '@mui/base/MenuButton';
import { MenuItem } from '@mui/base/MenuItem';
import { Dropdown } from '@mui/base/Dropdown';
import { BsPlusLg } from 'react-icons/bs'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Chat from '../../companents/chat/Chat'
import { MdDescription } from 'react-icons/md'
import { GoKebabHorizontal } from 'react-icons/go'
import Card from "../TaskINfo/Card";
import { useParams } from "react-router-dom";


export default function UserList({ taskItem, closeRef, setEditingTaskName, editingTaskName, inputRef, changeRef }) {

    const {id} = useParams()

    const tokenw = localStorage.getItem('accessToken');

    const postCard = async (listId, cardValue) => {
        try {
            await axios.post(
                `https://manager.zafarr.uz/routers/card/`,
                {
                    title: cardValue,
                    list: listId,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Token ${tokenw}`,
                    },
                }
            );
            window.location.reload();
        } catch (error) {
            console.error("Error:", error);
        }
    }


    const deleteList = async () => {
        try {
            const response = await axios.delete(
                `https://manager.zafarr.uz/routers/list/${taskItem.id}`,
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


    const listRename = async (taskItem , inputValue) => {
        console.log(taskItem);
        try {
            const response = await axios.put(
                `https://manager.zafarr.uz/routers/list/${taskItem}/`,
                {
                    title: inputValue ,
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



    return (
        <>
            <div className="taskCard" key={taskItem.id}>
                <div className="tasksNav">
                    <div className="taskData">
                        {taskItem.id === editingTaskName ? (
                            <input
                                type="text"
                                placeholder={taskItem.name}
                                onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                        listRename(taskItem.id , e.target.value)
                                        e.target.value = ""
                                    }
                                }}
                            />
                        ) : (
                            <p>{taskItem.title}</p>
                        )}
                    </div>
                    {/* <div className="taskSet">
                        <Dropdown>
                            <MenuButton>
                                <button>
                                    <GoKebabHorizontal />
                                </button>
                            </MenuButton>
                            <Menu className="dropMenu">
                                <MenuItem
                                    className="dropBtn"
                                    onClick={() => setEditingTaskName(taskItem.id)}
                                >
                                    Rename
                                </MenuItem>
                                <MenuItem onClick={deleteList} className="dropBtn">Delete this list</MenuItem>
                            </Menu>
                        </Dropdown>
                    </div> */}
                </div>

                <div className="taskInfoCardGlav">
                    <Card closeRef={closeRef} ids={taskItem.id} />
                </div>
                {/* <div className="addMiniDesc">
                    <input onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            postCard(taskItem.id, e.target.value);
                            e.target.value = "";
                        }
                    }} ref={inputRef} type="text" placeholder='Add another card' />

                </div> */}
            </div>
        </>
    )
}