import { observer } from 'mobx-react';
import React, { FC } from 'react';
import './App.scss';
import { AppState } from './App.state';
import { StoreList, SpecConfig, Controls } from './components';

export const App: FC<{ state: AppState }> = observer(({ state }) => {
  return (
    <div className="container">
      <div className="wrapper">
        <Controls />
        <SpecConfig />
        <StoreList state={state.storeListState}/>
      </div>
    </div>
  );
});