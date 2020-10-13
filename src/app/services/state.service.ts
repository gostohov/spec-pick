import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ISpec } from './spec-list.service';
import { IStore } from './store-list.service';

export interface IState {
  storeList?: IStore[];
  specList?: ISpec[];
  avatarList?: IAvatar[];
  selectedSpecAvatar?: IAvatar;
};

export interface IAvatar {
  id: number;
  fullName: string;
  iconUrl: string;
  storeList: IStore[];
  selected: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private readonly _state: BehaviorSubject<IState> = new BehaviorSubject({
    storeList: [],
    specList: [],
    avatarList: [],
    selectedSpecAvatar: null
  });

  constructor() { }

  get state$(): BehaviorSubject<IState> {
    return this._state;
  }

  get state(): IState {
    return this._state.value;
  }

  setState(newState: IState) {
    this._state.next({ ...this.state, ...newState });
  }
}
