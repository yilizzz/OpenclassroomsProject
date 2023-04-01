import logements from '../data/logements.json'
import '../styles/logements.css'
import { Link } from 'react-router-dom'

function Logements() {
    const roomData = [...logements]
    return (
        <div className="kasa-rooms">
            {roomData.map((item) => {
                const coverImage = item.cover
                // Show photos of each room with links to specific pages
                return (
                    <Link to={`/details/${item.id}`} key={item.id}>
                        <div
                            key={item.id}
                            className="kasa-room"
                            style={{ backgroundImage: `url(${coverImage})` }}
                        >
                            <span>{item.title}</span>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}

export default Logements
