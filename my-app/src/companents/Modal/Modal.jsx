import Chat from '../chat/Chat';
import './Modal.scss';


export default function ModalCss() {
    return (
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
                            
                        </div>
                    </div>
                </details>
            </div>
        </div>
    )
}

