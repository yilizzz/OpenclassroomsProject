import Banner from '../components/Banner'
import Header from '../components/Header'
import Footer from '../components/Footer'
import img_about from '../assets/kalen.png'
import Info from '../components/Info'
import info from '../data/info.json'

function About() {
    return (
        <div>
            <Header></Header>
            <Banner>
                <img src={img_about} alt="forest and mountain"></img>
            </Banner>
            <Info info={info} para1="category" para2="content"></Info>
            <Footer></Footer>
        </div>
    )
}
export default About
