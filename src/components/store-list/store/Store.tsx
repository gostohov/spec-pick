import React, { FC } from 'react'

import './Store.scss'
import arrowLeft from '../../../assets/img/arrow-left.svg';
import { IStore } from '../StoreList.state';

export const Store: FC<{ state: IStore, pickStore: (store: IStore) => void }> = ({state, pickStore}) => {
    return (
        <div className="store" onClick={() => pickStore(state)}>
            <img src={arrowLeft} alt="Указатель" />
            <img src={state.icon} alt="Иконка магазина" />
            <div className="store-data">
                <span className="header">{state.name}</span>
                <span className="sub-header">{state.fullAddress}</span>
            </div>
        </div>
    );
}