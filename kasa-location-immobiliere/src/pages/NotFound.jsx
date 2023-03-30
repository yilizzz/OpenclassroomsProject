import Header from '../components/Header'
import '../styles/NotFound.css'
import { Link } from 'react-router-dom'
function NotFound() {
    return (
        <div>
            <Header></Header>
            <div className="kasa-404">
                <p className="p404">404</p>
                <span>Oups! La page que vous demandez n'existe pas.</span>
                <Link className="link-404" to="/">
                    Retourner sur la page d'accueil
                </Link>
            </div>
        </div>
    )
}

export default NotFound
