import React, { useState } from 'react'
import logements from '../data/logements.json'
import RoomDetail from '../components/RoomDetail'
import "../styles/Carousel.css"
// get our fontawesome imports
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Rating = ({ value, size }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          color={i <= value ? '#FF6060' : '#E3E3E3'}
          size={size}
        />
      );
    }
    return <div>{stars}</div>;
  };
const Carousel = ({ id }) => {
    const dataLoge = [...logements]
    const numLoge = dataLoge.length;
    const index = dataLoge.findIndex((obj) => obj.id === id)
    const [currentIndex, setCurrentIndex] = useState(index)

    const nameStr = dataLoge[currentIndex].host['name'];
    const names = nameStr.split(" ");

    const nextSlide = () => {
        const newIndex = currentIndex + 1
        setCurrentIndex(newIndex >= dataLoge.length ? 0 : newIndex)
    }

    const previousSlide = () => {
        const newIndex = currentIndex - 1
        setCurrentIndex(newIndex < 0 ? dataLoge.length - 1 : newIndex)
    }

    return (
        <div className="carousel" key={`page${dataLoge[currentIndex].id}`}>
            <div className='carousel-img' style={{
            backgroundImage: `url(${dataLoge[currentIndex].cover})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>
               { numLoge>1 ? (<div className='slide-button'>
                <FontAwesomeIcon icon={faChevronLeft} beatFade size="4x" onClick={previousSlide} style={{
                    color: "#000000",
                    cursor: "pointer"

                    }}/>
        
                <FontAwesomeIcon icon={faChevronRight} beatFade size="4x" onClick={nextSlide} style={{
                    color: "#000000",
                    cursor: "pointer"}} />
                    </div>)
                :(<p></p>)}
            </div>
            <div className='index'>{currentIndex+1}/{numLoge}</div>
            <div className='room-info'>
                <div className="location">
                    <h1>{dataLoge[currentIndex].title}</h1>
                    <p>{dataLoge[currentIndex].location}</p>
                    <div className='tags'>
                        {dataLoge[currentIndex].tags.map((item) => {
                            return (<div className='tag' key={item}><span>{item}</span></div>)
                        })}
                    </div>
                </div>
                <div className="host-rating">
                    <div className='host'>
                        <ul className='names'>
                            <li>{names[0]}</li>
                            <li>{names[1]}</li>
                        </ul>
                        <img
                            src={dataLoge[currentIndex].host['picture']}
                            alt={dataLoge[currentIndex].host['name']}
                        ></img>
                    </div>
                    <div className='rating'>
                           
                        <Rating value={dataLoge[currentIndex].rating} size='2x' />
                    </div>
                </div>
            </div>
            <div className='room-detail'>
                <RoomDetail 
                    room={dataLoge[currentIndex]}
                    detail="description"
                ></RoomDetail>
                <RoomDetail 
                    room={dataLoge[currentIndex]} 
                    detail="equipments">
                </RoomDetail>
            </div>
        </div>
    )
}

export default Carousel
