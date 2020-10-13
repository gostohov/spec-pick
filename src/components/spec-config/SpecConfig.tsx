import React from 'react'

import './SpecConfig.scss'
import addSpec from '../../assets/img/add-spec.svg'

export const SpecConfig = () => {
    return (
        <div className="col left no-spec" >
            <SpecEmpty />
        </div>
    );
}

const SpecEmpty = () => {
    return (
        <div className="no-spec-alert">
            <span className="header">СПЕЦИАЛИСТ НЕ НАЗНАЧЕН</span>
            <span className="sub-header">Чтобы начать работу с нераспределенными магазинами, вам необходимо добавить хотя бы одного специалиста</span>
            <img src={addSpec} alt="Добавить специалиста" />
        </div>
    )
}