import React from 'react'

import '../styles/Button.css'

export const Button = onClick => {
    return (
        <div className="button-wrapper">
            <button onClick={onClick}>Test message.</button>
        </div>
    )
}
