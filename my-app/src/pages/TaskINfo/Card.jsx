import { useEffect , useState } from "react"
import axios from "axios"
import Chat from "../../companents/chat/Chat"
import { Modal } from '@mui/base/Modal';
import BasicModal from "../../companents/BasicModal/Modal";
import ChatModal from "../../companents/ChatModal/ChatModal";
import {AiOutlineDelete} from 'react-icons/ai'

export default function Card({ids , closeRef}) {

    // get card 
    const [cards, setCards] = useState([])
    const getCard = async () => {
        const response = await axios.get(`https://manager.zafarr.uz/routers/cards/${ids}`)
        setCards(response.data)
    }

    useEffect(() => {
        getCard()
    }, [])

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        window.location.reload()
        setOpen(true)
    }

    return (
        <>
            {
                cards.map(card => (
                    <div className="taskInfoCard" key={card.id}>
                        <button><AiOutlineDelete/></button>
                        <p>{card.title}</p>
                        <div className="taskInfoCard__usersINfo">
                            <img src="https://lh3.googleusercontent.com/a/AAcHTtebJ7FQXHDSt3g_H96uktTJuDJIcYFas4iuzt1iMGSV=s96-c" alt="" />
                            <img src="https://lh3.googleusercontent.com/a/AAcHTtebJ7FQXHDSt3g_H96uktTJuDJIcYFas4iuzt1iMGSV=s96-c" alt="" />
                        </div>
                        <ChatModal open={open} setOpen={setOpen} main={<Chat handleOpen={handleOpen} card={card}/>}/>
                    </div>
                ))
            }
        </>
    )
}