import React, { useState } from 'react'
import PropTypes from 'prop-types'
import RoomDetail from '../components/RoomDetail'
import '../styles/Carousel.css'
// get fontawesome imports
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Rating = ({ value, size }) => {
    const stars = []
    //check prop, prop value need to be number, and on a scale of 1-5
    const notValid = isNaN(value) || Number(value) < 1 || Number(value) > 5

    !notValid
        ? (() => {
              //if it's valid, show corresponding number of red stars
              for (let i = 1; i <= 5; i++) {
                  stars.push(
                      <FontAwesomeIcon
                          key={i}
                          icon={faStar}
                          color={i <= Number(value) ? '#FF6060' : '#E3E3E3'}
                          size={size}
                      />
                  )
              }
          })()
        : (() => {
              //if it's not valid, show 5 grey stars
              for (let i = 1; i <= 5; i++) {
                  stars.push(
                      <FontAwesomeIcon
                          key={i}
                          icon={faStar}
                          color={'#E3E3E3'}
                          size={size}
                      />
                  )
              }
          })()
    return <div>{stars}</div>
}

const Carousel = ({ data }) => {
    //const dataLoge = [...data];
    // const numLoge = dataLoge.length;
    const numImg = data.pictures.length;
    const [currentIndex, setCurrentIndex] = useState(0)
    //Use a space to separate first and last name
    const nameStr = data.host['name']
    const names = nameStr.split(' ')
    //Add 1 to index, if it is the last one, return the first one
    const nextSlide = () => {
        const newIndex = currentIndex + 1
        setCurrentIndex(newIndex >= numImg ? 0 : newIndex)
    }
    //Decrease index by 1, if it is the first one, return the last one
    const previousSlide = () => {
        const newIndex = currentIndex - 1
        setCurrentIndex(newIndex < 0 ? numImg - 1 : newIndex)
    }

    return (
        <div className="carousel" key={`page${data.id}`}>
            {/* Display room's photos */}
            <div
                className="carousel-img"
                style={{
                    backgroundImage: `url(${data.pictures[currentIndex]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {/* if there are more than 1 room in the list, show previous and next button, if there is not, does not show them */}
                {numImg > 1 ? (
                    <div className="slide-button">
                        <FontAwesomeIcon
                            icon={faChevronLeft}
                            beatFade
                            size="4x"
                            onClick={previousSlide}
                            style={{
                                color: '#000000',
                                cursor: 'pointer',
                            }}
                        />

                        <FontAwesomeIcon
                            icon={faChevronRight}
                            beatFade
                            size="4x"
                            onClick={nextSlide}
                            style={{
                                color: '#000000',
                                cursor: 'pointer',
                            }}
                        />
                    </div>
                ) : (
                    <p></p>
                )}
                <div className="index">
                    {currentIndex + 1}/{numImg}
                </div>
            </div>
            {/* Display currentIndex */}
            
            <div className="room-info">
                {/* Display loaction and tags*/}
                <div className="location">
                    <h1>{data.title}</h1>
                    <p>{data.location}</p>
                    <div className="tags">
                        {data.tags.map((item) => {
                            return (
                                <div className="tag" key={item}>
                                    <span>{item}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
                {/* Display host name and rating*/}
                <div className="host-rating">
                    <div className="host">
                        <ul className="names">
                            <li>{names[0]}</li>
                            <li>{names[1]}</li>
                        </ul>
                        <img
                            src={data.host['picture']}
                            alt={data.host['name']}
                        ></img>
                    </div>
                    <div className="rating">
                        {/* According to the rating data, display the corresponding stars*/}
                        <Rating
                            value={data.rating}
                            size="2x"
                        />
                    </div>
                </div>
            </div>
            {/* Show collapsible content*/}
            <div className="room-detail">
                <RoomDetail
                    room={data}
                    detail="description"
                ></RoomDetail>
                <RoomDetail
                    room={data}
                    detail="equipments"
                ></RoomDetail>
            </div>
        </div>
    )
}
Carousel.propTypes = {
    index: PropTypes.number,
    dataLoge: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string,
            value: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.arrayOf(PropTypes.string),
            ]),
        })
    ),
}
Carousel.defaultProps = {
    index: 0,
    dataLoge: [
        {
            id: 'défaut',
            title: 'défaut',
            cover: 'défaut',
            pictures: 'défaut',
            description: ['défaut'],
            host: {
                name: 'défaut défaut',
                picture: 'défaut',
            },
            rating: 'défaut',
            location: 'défaut',
            equipments: 'défaut',
            tags: ['défaut'],
        },
    ],
}
export default Carousel
