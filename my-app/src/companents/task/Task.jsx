import { GoKebabHorizontal } from 'react-icons/go'

export default function Task() {
    return (
        <>
            <div className="taskCardAdd">
                <button>Add another list +</button>
            </div>
            <div className="taskCard">
                <div className="taskCardTop">
                    <div className="taskTopTitle">
                        <h4>28.02.2023</h4>
                        <h5>2:12</h5>
                    </div>
                    <button><GoKebabHorizontal /></button>
                </div>
                <div className="taskText">
                    <p>Website Build</p>
                </div>
            </div>
        </>
    )
}