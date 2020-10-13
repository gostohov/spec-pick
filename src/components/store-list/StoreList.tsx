import React, { FC } from 'react'

import { observer } from 'mobx-react';

import './StoreList.scss';
import attention from '../../assets/img/attention.svg';
import StoreListState from './StoreList.state';

export const StoreList: FC<{ state: StoreListState }> = observer(({ state }) => {
    return (
        <div className="col right">
            <div className="store-list__wrapper">
                <div className="store-list__count">
                    <span>Нераспределенные магазины: <span className="store-list__count-number">7</span></span>
                    <img src={attention} alt="Внимание!" />
                </div>
                <div className="store-list">
                    { state.storeListEl }
                </div>
            </div>
        </div>
    );
});