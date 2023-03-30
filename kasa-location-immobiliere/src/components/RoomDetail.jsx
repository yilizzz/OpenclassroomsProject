import { useState } from "react";
import "../styles/RoomDetail.css"
// get our fontawesome imports
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ShowContent({room, detail}) {
    const content = room[detail];
    return Array.isArray(content) ? (
      <ul>
        {content.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    ) : typeof content === "string" ? (
      <p>{content}</p>
    ) : null;
  }

function RoomDetail({room, detail}){
    const [isOpen, setIsOpen] = useState(false)
    
    return (
        <div>
            {isOpen ? (
                <div className="detail-open" >
                    <div
                        className="toggle-button"
                        onClick={() => setIsOpen(false)}
                    >
                        <span>{detail[0].toUpperCase() + detail.slice(1)}</span>
                        <span><FontAwesomeIcon icon={faChevronUp} /></span>
                    </div>

                    <div className="detail"  >
                    {ShowContent({room, detail})}
                   </div>
                        
                </div>
            ) : (
                <div className="detail-closed" >
                    <div
                        className="toggle-button"
                        onClick={() => setIsOpen(true)}
                    >
                        <span>{detail[0].toUpperCase() + detail.slice(1)}</span>
                        <span><FontAwesomeIcon icon={faChevronDown} /></span>
                    </div>
                </div>
            )}
        </div>
    )
}
export default RoomDetail;