import '../styles/Header.css'
import icon from "../assets/Vector.png"
import { Link } from 'react-router-dom'

function Header() {
    return (
        <div className="kasa-header">
            <h1>
                K<img src={icon} alt="Kasa red house icon" />
                sa
            </h1>
            <nav className="kasa-nav">
                <Link className="nav-link" to="/">Accueil</Link>
                <Link className="nav-link" to="/about">A Propos</Link>
            </nav>
        </div>
    )
}

export default Header
