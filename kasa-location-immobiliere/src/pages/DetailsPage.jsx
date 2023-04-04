import React from 'react'
import logements from '../data/logements.json'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Carousel from '../components/Carousel'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function DetailsPage() {
    const { id }  = useParams()
    const navigate = useNavigate()
    const dataLoge = [...logements]
    const thisLoge = dataLoge.find((obj) => obj.id === id)
    //If the object with this id is not found, jump to the error page
    useEffect(() => {
        if (thisLoge === undefined) {
            navigate('/non-existent-path')
        }
    }, [thisLoge, navigate])

    if (thisLoge === undefined) {
        return null
    }

    return (
        <div>
            <Header></Header>
            <Carousel data={thisLoge}></Carousel>
            <Footer></Footer>
        </div>
    )
}

export default DetailsPage
