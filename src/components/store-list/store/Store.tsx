import React from 'react'

import './Store.scss'
import arrowLeft from '../../../assets/img/arrow-left.svg';

export function Store() {
    return (
        <div className="store">
            <img src={arrowLeft} alt="Указатель" />
            <img src="https://i.imgur.com/ublxFpg.png" alt="Иконка магазина" />
            <div className="store-data">
                <span className="header">Brandshop на Дмитровской 9</span>
                <span className="sub-header">г. Москва, ул. Курская, д. 392б, стр. 3, офис 239</span>
            </div>
        </div>
    );
}