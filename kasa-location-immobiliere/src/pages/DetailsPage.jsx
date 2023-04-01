import React from 'react'
import logements from '../data/logements.json'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Carousel from '../components/Carousel'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function DetailsPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const dataLoge = [...logements]
    const index = dataLoge.findIndex((obj) => obj.id === id)
    //If the object with this id is not found, jump to the error page
    useEffect(() => {
        if (index < 0) {
            navigate('/non-existent-path')
        }
    }, [index, navigate])

    if (index < 0) {
        return null
    }

    return (
        <div>
            <Header></Header>
            <Carousel index={index} data={dataLoge}></Carousel>
            <Footer></Footer>
        </div>
    )
}

export default DetailsPage
