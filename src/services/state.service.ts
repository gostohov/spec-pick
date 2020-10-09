import { BehaviorSubject } from "rxjs";

interface IState {
    storeList: [],
    specList: [],
    avatarList: [],
    selectedSpecAvatar: [],
}

export class StateService {
    private _state: BehaviorSubject<IState> = new BehaviorSubject<IState>({
        storeList: [],
        specList: [],
        avatarList: [],
        selectedSpecAvatar: [],
    })

    get state$(): BehaviorSubject<IState> {
        return this._state;
    }
    
    get state(): IState {
        return this._state.value;
    }

    setState(newState: { [key: string]: any }): void {
        this._state.next({ ...this.state, ...newState });
    }
}
