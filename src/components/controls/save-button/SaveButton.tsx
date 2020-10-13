import React from 'react'
import './SaveButton.scss'

import check from '../../../assets/img/check.svg'

export const SaveButton = () => {
    return (
        <button className="save-changes__button">
            <span className="save-changes__message">Сохранить изменения</span>
            <img src={check} alt="Сохранить изменения" />
        </button>
    );
}