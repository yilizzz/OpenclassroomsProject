import '../styles/Footer.css'
import icon from "../assets/Vector.png"

function Footer() {
	return (
    <div className='kasa-footer'>
        <h2>K<img src={icon} alt="Kasa house icon" />sa</h2>
        <p>© 2020 Kasa. All rights reserved</p>
    </div>)
}

export default Footer
