import React from 'react'

import './Submit.css'

const Submit = props => {
    return (
        <div className='settings-form'>
            <button className='btn btn-success'>حفظ</button>
            <button className='btn btn-warning'>الغاء</button>
        </div>
    )
}

export default Submit