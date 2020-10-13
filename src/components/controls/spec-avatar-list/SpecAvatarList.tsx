import React from 'react'

import './SpecAvatarList.scss'
import samoilof from '../../../assets/img/samoilof.svg'

export const SpecAvatarList = () => {
    return (
        <div className="left__control">
            <div className="spec-avatar__list">
                <div className="spec__avatar">
                    <img src={samoilof} alt="Аватарка специалиста"/>
                    <div className="spec-counter__wrapper">
                        <span className="spec-counter">7</span>
                    </div>
                </div>
            </div>
            <div className="add-spec__control">
                <button className="add-spec__button">+</button>
                <span>Добавить специалиста</span>
            </div>
        </div>
    );
}