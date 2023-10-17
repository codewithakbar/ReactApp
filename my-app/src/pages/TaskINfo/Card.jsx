import { useEffect , useState } from "react"
import axios from "axios"
import Chat from "../../companents/chat/Chat"
import { Modal } from '@mui/base/Modal';
import BasicModal from "../../companents/BasicModal/Modal";
import ChatModal from "../../companents/ChatModal/ChatModal";

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



    return (
        <>
            {
                cards.map(card => (
                    <div className="taskInfoCard" key={card.id}>
                        <p>{card.title}</p>
                        <div className="taskInfoCard__usersINfo">
                            <img src="https://lh3.googleusercontent.com/a/AAcHTtebJ7FQXHDSt3g_H96uktTJuDJIcYFas4iuzt1iMGSV=s96-c" alt="" />
                            <img src="https://lh3.googleusercontent.com/a/AAcHTtebJ7FQXHDSt3g_H96uktTJuDJIcYFas4iuzt1iMGSV=s96-c" alt="" />
                        </div>
                        <ChatModal main={<Chat card={card}/>}/>
                    </div>
                ))
            }
        </>
    )
}