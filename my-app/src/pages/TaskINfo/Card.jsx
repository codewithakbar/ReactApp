import { useEffect, useRef, useState } from "react"
import axios from "axios"
import Chat from "../../companents/chat/Chat"
import { Modal } from '@mui/base/Modal';
import BasicModal from "../../companents/BasicModal/Modal";
import ChatModal from "../../companents/ChatModal/ChatModal";
import { AiOutlineDelete } from 'react-icons/ai'

export default function Card({ ids, closeRef }) {

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
    const modalRef = useRef()
    const tokenw = localStorage.getItem('accessToken');


    const deleteCard = async (cardID) => {
        const response = await axios.delete(`https://manager.zafarr.uz/routers/card/${cardID}/`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Token ${tokenw}`,
            },
        })
        getCard()
    }

    return (
        <>
            {
                cards.map(card => (
                    <div className="taskInfoCard" key={card.id}>
                        <button onClick={() => deleteCard(card.id)}><AiOutlineDelete /></button>
                        <p>{card.title}</p>
                        <div className="taskInfoCard__usersINfo">
                            <img src="https://lh3.googleusercontent.com/a/AAcHTtebJ7FQXHDSt3g_H96uktTJuDJIcYFas4iuzt1iMGSV=s96-c" alt="" />
                            <img src="https://lh3.googleusercontent.com/a/AAcHTtebJ7FQXHDSt3g_H96uktTJuDJIcYFas4iuzt1iMGSV=s96-c" alt="" />
                        </div>
                        {/* <div ref={modalRef} className="block">
                            <div className="modalClose"></div>
                            <div className="modalMain">
                                <Chat card={card} />
                            </div>
                        </div> */}
                        <div className="ModalCss">
                            <div className="Modalcontainer">
                                <details>
                                    <summary>
                                        <div className="Modalbutton">
                                            Show me the modal
                                        </div>
                                        <div className="details-modal-overlay"></div>
                                    </summary>
                                    <div className="details-modal">
                                        <div className="details-modal-close">
                                        </div>
                                        <div className="details-modal-title">
                                            <h1>My details modal</h1>
                                        </div>
                                        <div className="details-modal-content">
                                            <Chat card={card} />
                                        </div>
                                    </div>
                                </details>
                            </div>
                        </div>

                        {/* <ChatModal open={open} setOpen={setOpen} main={ } /> */}
                    </div>
                ))
            }
        </>
    )
}