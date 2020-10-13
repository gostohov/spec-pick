import React from 'react'

import './Controls.scss'
import { SpecAvatarList } from './spec-avatar-list/SpecAvatarList';
import { SaveButton } from './save-button/SaveButton';

export const Controls = () => {
    return (
        <div className="controls">
            <SpecAvatarList />
            <SaveButton />
        </div>
    );
}