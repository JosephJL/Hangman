import React from 'react'
import "./popup.css";

function Popup(props) {
  return (props.trigger) ? (
    <div className="popup">
        <div className="popup-inner">
            <button className='close-btn' onClick={() => window.location.reload(false)}>Play Again?</button>
            { props.children }
        </div>
    </div>
  ) : "";
}

export default Popup