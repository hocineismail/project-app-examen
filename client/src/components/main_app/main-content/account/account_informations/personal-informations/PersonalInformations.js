import React from 'react'

import './PersonalInformations.css'

const PersonalInformations = props => {
    return (
        <div className="info-section">
            <p className='prop'>{props.prop} :</p>
            <p className='prop-value'>{props.propValue}</p>
        </div>
    )
}

export default PersonalInformations