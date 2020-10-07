import { elements } from '../utils/elements';
import { filter } from 'rxjs/operators';

export default class StoreListComponent {
    constructor(
        state,
        storeListService
    ) {
        this.state = state;
        this.storeService = storeListService;
        this.init();
    }

    init() {
        this.state.getState().storeList$.pipe(
            filter(list => list)
        ).subscribe(list => this.render(list));

        this.fetchStore();
    }

    async fetchStore() {
        try {
            // сохраняем список магазинов в state
            const storeList = await this.storeService.getStoreList();
            this.state.getState().storeList$.next(storeList);
        } catch (error) {
            console.log(error);
        }
    }

    clearView() {
        elements.storeList().innerHTML = '';
    }

    addStoreToSpec(store) {
        const newAvatarList = this.state.getState().avatarList$.getValue();
        const selectedAvatar = this.state.getState().selectedSpecAvatar$.getValue();
        if (!selectedAvatar || !selectedAvatar.fullName) {
            alert('Пожалуйста, выберите специалиста');
            return;
        }

        const selectedAvatarIndex = newAvatarList.findIndex(item => item.id === selectedAvatar.id);
        newAvatarList[selectedAvatarIndex] = {
            ...newAvatarList[selectedAvatarIndex],
            storeList: [
                ...newAvatarList[selectedAvatarIndex].storeList,
                { ...store }
            ]
        };

        this.state.getState().avatarList$.next(newAvatarList);
        this.state.getState().selectedSpecAvatar$.next(newAvatarList[selectedAvatarIndex]);
        this.deleteStoreFromStoreList(store);
    }

    deleteStoreFromStoreList(store) {
        const storeList = this.state.getState().storeList$.getValue();
        const newStoreList = storeList.filter(item => item.id !== store.id);
        this.state.getState().storeList$.next(newStoreList);
    }

    render(list) {
        // отчищаем DOM перед рендером
        this.clearView();
        // рендер
        list.forEach(item => {
            const el = new Store(item, (store) => this.addStoreToSpec(store));
            elements.storeList().appendChild(el);
        });
    }
}

class Store {
    constructor(state, onclick) {
        this.state = state;
        this.onclick = onclick;
        return this.render();
    }

    render() {
        const div = document.createElement('div');
        div.classList.add('store');
        div.onclick = () => this.onclick(this.state);
        div.innerHTML = `
            <img src="/src/img/arrow-left.svg">
            <img src="${this.state.icon}">
            <div class="store-data">
                <span class="header">${this.state.name}</span>
                <span class="sub-header">${this.state.fullAddress}</span>
            </div>
        `;

        return div;
    }
}