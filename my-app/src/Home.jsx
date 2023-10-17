import { Link } from "react-router-dom";

export default function Home() {
    return (
        <>
            <h1>Home</h1>
            <Link to='/about'>
                <button>About</button>
            </Link>
        </>
    )
}