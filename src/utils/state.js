import { BehaviorSubject, Subject } from "rxjs";

export class State {
    constructor() {
        this.state = {
            storeList$: new BehaviorSubject(null),
            specList$: new BehaviorSubject(null),
            avatarList$: new BehaviorSubject(null),
            selectedSpecAvatar$: new BehaviorSubject(null)
        }
    }

    getState() {
        return this.state;
    }

    /**
     * Получение значения subject`a.
     * Не забывай добавить в конце имени поля "$"
     * @example
     * ```
     * getValue('storeList$')
     * ```
     * @param {string} field имя поля
     */
    getValue(field) {
        return this.state[field];
    }
}
