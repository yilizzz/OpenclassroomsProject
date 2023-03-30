import '../styles/Info.css'
import { useState } from 'react'
// get our fontawesome imports
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function InfoItem({ item, itemPara1, itemPara2 }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div>
            {isOpen ? (
                <div className="kasa-info">
                    <div
                        className="toggle-button"
                        onClick={() => setIsOpen(false)}
                    >
                        <span>{item[itemPara1]}</span>
                        <span><FontAwesomeIcon icon={faChevronUp} /></span>
                    </div>

                    <div key={item.id} className="category-info">
                        <span>{item[itemPara2]}</span>
                    </div>
                </div>
            ) : (
                <div className="closed">
                    <div
                        className="toggle-button"
                        onClick={() => setIsOpen(true)}
                    >
                        <span>{item[itemPara1]}</span>
                        <span><FontAwesomeIcon icon={faChevronDown} /></span>
                    </div>
                </div>
            )}
        </div>
    )
}

function Info({ info, para1, para2 }) {
    return (
        <div>
            {info.map((item) => (
                <InfoItem key={item.id} item={item} itemPara1={para1} itemPara2={para2} />
            ))}
        </div>
    )
}

export default Info
