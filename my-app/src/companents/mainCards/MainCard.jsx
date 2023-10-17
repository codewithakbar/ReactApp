/* eslint-disable react/prop-types */
import './mainCard.css'


export default function MainCard({item}) {
    return (
        <div className="mainCard" key={item.id}>
            <div className="mainCardImg">
                <img src={item.profile_image} alt="" />
            </div>
            <h4>{item.username}</h4>
        </div>
    )
}