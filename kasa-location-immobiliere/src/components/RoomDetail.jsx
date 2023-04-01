import { useState } from 'react'
import '../styles/RoomDetail.css'
import PropTypes from 'prop-types'
// get fontawesome imports
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// If the value of the key detail is an array, it will be displayed as a list; 
// if it is a string, it will be displayed directly
function ShowContent({ room, detail }) {
    const content = room[detail]
    return Array.isArray(content) ? (
        <ul>
            {content.map((item) => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    ) : typeof content === 'string' ? (
        <p>{content}</p>
    ) : null
}

function RoomDetail({ room, detail }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div>
            {isOpen ? (
                <div className="detail-open">
                    <div
                        className="toggle-button"
                        onClick={() => setIsOpen(false)}
                    >
                        <span>{detail[0].toUpperCase() + detail.slice(1)}</span>
                        <span>
                            <FontAwesomeIcon icon={faChevronUp} />
                        </span>
                    </div>

                    <div className="detail">
                        {ShowContent({ room, detail })}
                    </div>
                </div>
            ) : (
                <div className="detail-closed">
                    <div
                        className="toggle-button"
                        onClick={() => setIsOpen(true)}
                    >
                        <span>{detail[0].toUpperCase() + detail.slice(1)}</span>
                        <span>
                            <FontAwesomeIcon icon={faChevronDown} />
                        </span>
                    </div>
                </div>
            )}
        </div>
    )
}
RoomDetail.propTypes = {
    room: PropTypes.shape({
        key: PropTypes.string,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.string),
        ]),
    }),
}
export default RoomDetail
