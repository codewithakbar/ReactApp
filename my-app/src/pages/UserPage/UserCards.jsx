import axios from 'axios'
import { Link } from 'react-router-dom'
import { BiPencil } from 'react-icons/bi'
import { AiOutlineDelete } from 'react-icons/ai'
import BasicModal from '../../companents/BasicModal/Modal'
import { BsCheckLg } from 'react-icons/bs'
import { BiCheckboxMinus } from 'react-icons/bi'
import Button from '@mui/material/Button';
import { useRef } from 'react'

export default function UserCards({ item }) {

    const token = localStorage.getItem('accessToken')

    const deleteBoard = async () => {
        const response = await axios.delete(`https://manager.zafarr.uz/routers/boards/${item.id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            }
        )
        window.location.reload()
    }


    const renameBoard = async (Id, Title) => {
        const response = await axios.put(`https://manager.zafarr.uz/routers/boards/${item.id}/`,
            {
                title: Title,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            }
        )
        window.location.reload()
    }

    
    const boardValue = useRef()

    return (
        <div className="UserCardBox" key={item.id}>
            <div className="UserCard">
                <div className="boximgtype">
                    {/* <div className="modal">
                        <Button style={{ minWidth: 'auto' }} variant="text"><BiCheckboxMinus color='red' size={'30px'} /></Button>
                        <Button style={{ minWidth: 'auto' }} variant="text"><BsCheckLg color='green' size={'30px'} /></Button>
                        <BasicModal main={<button className='saveModal' onClick={deleteBoard}>Delete</button>} text={'Delete Board ?'} btn={<AiOutlineDelete color='red' size={'25px'} />} />
                        <BasicModal
                            element={<input onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    renameBoard(item.id, e.target.value)
                                }
                            }} className='modalIn' ref={boardValue} placeholder='Board Name' />}
                            main={<button className='saveModal' onClick={(e) => {
                                renameBoard(item.id, boardValue.current.value)
                            }}>ok</button>} text={'Board rename'}
                            btn={<BiPencil color='black' size={'25px'} />}
                        />
                    </div> */}
                </div>
                <Link to={`/UserTaskInfo/${item.id}`}>
                    <div className="Teaxt">
                        <p>{item.title}</p>
                    </div>
                </Link>
                <div className="UserImg">
                    {/* {
                        item.users.map(data => (
                            <img src={data.image} alt="" />
                        ))
                    } */}
                </div>
            </div>
        </div>
    )
}