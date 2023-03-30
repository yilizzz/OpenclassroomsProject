import '../styles/Home.css'
import Banner from '../components/Banner'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Logements from '../components/Logements'
import img from "../assets/IMG.png"
import React from 'react'

const Home = () => {
    return (
        <div>
            <Header></Header>
            <Banner>
                <img src={img} alt="sea and mountain"></img>
                <p>Chez vous, partout et ailleurs</p>
            </Banner>
            <Logements></Logements>
            <Footer></Footer>
        </div>
    )
}

export default Home
