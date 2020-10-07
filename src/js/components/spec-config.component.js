import { elements } from "../utils/elements";

export default class SpecConfigComponent {
    constructor(state) {
        this.state = state;
        this.init();
    }

    init() {
        this.state.getState().selectedSpecAvatar$.subscribe(avatar => {
            this.avatar = avatar;
            this.render();
        });
    }

    /**
     * Удалить аватар
     */
    deleteActiveSpecAvatar() {
        const avatarList = this.state.getState().avatarList$.getValue();
        const newAvatarList = avatarList.filter(avatar => !avatar.selected);
        this.state.getState().avatarList$.next(newAvatarList);
    }

    /**
     * Нажатие на крестик
     */
    onclose() {
        // Возвращаем пикнутые магазины обратно в "обойму"
        const selectedAvatar = this.state.getState().selectedSpecAvatar$.getValue();
        const storeList = this.state.getState().storeList$.getValue();
        const newStoreList = [...storeList, ...selectedAvatar.storeList];
        this.state.getState().storeList$.next(newStoreList);

        this.deleteActiveSpecAvatar();
        this.state.getState().selectedSpecAvatar$.next(undefined);
    };

    /**
     * Очистить вьюху
     */
    clearView() {
        elements.colSelectSpec().innerHTML = '';
    }

    render() {
        this.clearView();

        if (!this.avatar) {
            const el = new SpecEmpty();
            elements.colSelectSpec().appendChild(el);
        } else if (this.avatar && !this.avatar.fullName) {
            const list = new SpecPick(this.state, () => this.onclose());
            list.forEach(el => elements.colSelectSpec().appendChild(el))
        } else {
            const list = new SpecStore(this.state, () => this.onclose(), elements);
            list.forEach(el => elements.colSelectSpec().appendChild(el))
        }
    }
}

/**
 * Сбросить компонент в состояние "СПЕЦИАЛИСТ НЕ НАЗНАЧЕН"
 */
class SpecEmpty {
    constructor() {
        return this.render();
    }

    render() {
        elements.colSelectSpec().classList.add('no-spec');
        elements.colSelectSpec().classList.remove('select-spec');
        const div = document.createElement('div');
        div.classList.add('no-spec-alert');
        div.innerHTML = `
            <span class="header">СПЕЦИАЛИСТ НЕ НАЗНАЧЕН</span>
            <span class="sub-header">Чтобы начать работу с нераспределенными магазинами, вам необходимо добавить хотя бы одного специалиста</span>
            <img src="/src/img/add-spec.svg" alt="Добавить специалиста">
        
        `;
        return div;
    }
}

/**
 * Пользователь добавил аватар, но ещё не выбрал специалиста
 */
class SpecPick {
    constructor(state, onclose) {
        this.state = state;
        this.onclose = onclose;

        return this.render();
    }

    onchange(e) {
        const specFullName = e.target.value;
        const specList = this.state.getState().specList$.getValue();
        const pickedSpec = specList.find(spec => spec.fullName === specFullName);
        const newAvatarList = this.state.getState().avatarList$.getValue();
        const selectedAvatar = this.state.getState().selectedSpecAvatar$.getValue();
        const selectedAvatarIndex = newAvatarList.findIndex(item => item.id === selectedAvatar.id);
        newAvatarList[selectedAvatarIndex] = {
            ...newAvatarList[selectedAvatarIndex],
            iconUrl: pickedSpec.iconUrl,
            fullName: pickedSpec.fullName
        };

        this.state.getState().avatarList$.next(newAvatarList);
        this.state.getState().selectedSpecAvatar$.next(newAvatarList[selectedAvatarIndex]);
    }

    render() {
        // Т.к. теперь у пользователя есть аватар на выбор, открываем окно для конфигурирования специалиста
        elements.colSelectSpec().classList.remove('no-spec');
        elements.colSelectSpec().classList.add('select-spec');

        // создаем разметку
        const button = document.createElement('button');
        button.classList.add('select-spec__close');
        button.innerHTML = 'x';
        button.onclick = () => this.onclose();

        const div = document.createElement('div');
        div.classList.add('select-spec__wrapper');
        div.innerHTML = '<span class="select-spec__title">Выберите специалиста</span>';

        const input = document.createElement('input');
        input.classList.add('select-spec__input');
        input.setAttribute('type', 'string');
        input.setAttribute('name', 'name');
        input.setAttribute('list', 'select-spec__namelist');
        input.onchange = (e) => this.onchange(e);

        const datalist = document.createElement('datalist');
        datalist.id = 'select-spec__namelist';
        datalist.innerHTML = `
            ${this.state.getState().specList$.getValue().map(spec => `<option value="${spec.fullName}">`).join('')}
        `;

        div.appendChild(input);
        div.appendChild(datalist);

        return [
            button,
            div
        ];
    }
}

class SpecStore {
    constructor(state, onclose, elements) {
        this.state = state;
        this.onclose = onclose;
        this.elements = elements;
        return this.render();
    }

    /**
     * Удаляет выбранного специалиста
     */
    deleteSpec() {
        const newAvatarList = this.state.getState().avatarList$.getValue();
        const selectedAvatar = this.state.getState().selectedSpecAvatar$.getValue();
        const selectedAvatarIndex = newAvatarList.findIndex(item => item.id === selectedAvatar.id);

        // Возвращаем пикнутые магазины обратно в "обойму"
        const storeList = this.state.getState().storeList$.getValue();
        const newStoreList = [...storeList, ...selectedAvatar.storeList];
        this.state.getState().storeList$.next(newStoreList);

        // обнуляем аватара
        newAvatarList[selectedAvatarIndex] = {
            ...newAvatarList[selectedAvatarIndex],
            iconUrl: undefined,
            fullName: undefined,
            storeList: []
        };

        this.state.getState().avatarList$.next(newAvatarList);
        this.state.getState().selectedSpecAvatar$.next(newAvatarList[selectedAvatarIndex]);
    }

    /**
     * Возвращает компонент с магазинами
     */
    calculateSpecStore() {
        const selectedAvatar = this.state.getState().selectedSpecAvatar$.getValue();

        if (!selectedAvatar.storeList || !selectedAvatar.storeList.length) {
            return new SpecStoreEmpty();
        } else {
            return new SpecStoreList(selectedAvatar.storeList, this.state);
        }
    }

    calculateSpecStoreCount() {
        const selectedAvatar = this.state.getState().selectedSpecAvatar$.getValue();
        return !selectedAvatar.storeList || !selectedAvatar.storeList.length ? 0 : selectedAvatar.storeList.length;
    }

    render() {
        const selectedAvatar = this.state.getState().selectedSpecAvatar$.getValue();

        // Т.к. теперь у пользователя есть аватар на выбор, открываем окно для конфигурирования специалиста
        elements.colSelectSpec().classList.remove('no-spec');
        elements.colSelectSpec().classList.add('select-spec');

        // создаем разметку
        const closeButton = document.createElement('button');
        closeButton.classList.add('select-spec__close');
        closeButton.innerHTML = 'x';
        closeButton.onclick = () => this.onclose();

        const wrapper = document.createElement('div');
        wrapper.classList.add('select-spec__wrapper');
        wrapper.innerHTML = '<span class="select-spec__title">Специалист</span>';

        const specConfig = document.createElement('div');
        specConfig.classList.add('spec-config');
        specConfig.innerHTML = `
            <div>
                <img class="spec-config__avatar" src="${selectedAvatar.iconUrl}">
                <span class="spec-config__fullname">${selectedAvatar.fullName}</span>
                <span class="spec-config__store_count">${this.calculateSpecStoreCount()} маг.</span>
            </div>
        `;

        const trashButton = document.createElement('button');
        trashButton.classList.add('spec-config__trash');
        trashButton.innerHTML = '<img src="/src/img/trash-can.svg">';
        trashButton.onclick = () => this.deleteSpec();
        
        specConfig.appendChild(trashButton);

        const specTitle = document.createElement('span');
        specTitle.classList.add('select-spec__title');
        specTitle.innerHTML = 'Магазины';

        let specStore = this.calculateSpecStore();

        wrapper.appendChild(specConfig);
        wrapper.appendChild(specTitle);
        wrapper.appendChild(specStore);

        return [closeButton, wrapper];
    }
}

class SpecStoreEmpty {
    constructor() {
        return this.render();
    }

    render() {
        const specWarning = document.createElement('div');
        specWarning.classList.add('select-spec__warning');
        specWarning.innerHTML = `
            <span>Не назначены</span>
            <img src="/src/img/attention.svg" alt="Внимание!">
        `;

        return specWarning;
    }
}

class SpecStoreList {
    constructor(storeList, state) {
        this.state = state;
        this.storeList = storeList;
        return this.render();
    }

    deleteFromStoreList(store) {
        const newAvatarList = this.state.getState().avatarList$.getValue();
        const selectedAvatar = this.state.getState().selectedSpecAvatar$.getValue();
        const selectedAvatarIndex = newAvatarList.findIndex(item => item.id === selectedAvatar.id);

        // Возвращаем пикнутый магазин обратно в "обойму"
        const storeList = this.state.getState().storeList$.getValue();
        const newStoreList = [...storeList, store];

        // обнуляем аватара
        newAvatarList[selectedAvatarIndex] = {
            ...selectedAvatar,
            storeList: [...selectedAvatar.storeList.filter(item => item.id !== store.id)]
        };

        this.state.getState().storeList$.next(newStoreList);
        this.state.getState().avatarList$.next(newAvatarList);
        this.state.getState().selectedSpecAvatar$.next(newAvatarList[selectedAvatarIndex]);
    }

    render() {
        const div = document.createElement('div');
        div.classList.add('spec-store__list');
        this.storeList.forEach(item => {
            const el = new Store(item, (store) => this.deleteFromStoreList(store));
            div.appendChild(el);
        })

        return div;
    }
}

class Store {
    constructor(state, deleteStore) {
        this.state = state;
        this.deleteStore = deleteStore;
        return this.render();
    }

    render() {
        const div = document.createElement('div');
        div.classList.add('spec-store');
        div.innerHTML = `
            <div class="spec-store__info">
                <img src="/src/img/arrow-left.svg">
                <img src="${this.state.icon}">
                <div class="store-data">
                    <span class="header">${this.state.name}</span>
                    <span class="sub-header">${this.state.fullAddress}</span>
                </div>
            </div>
        `;

        const trashButton = document.createElement('button');
        trashButton.classList.add('spec-store__trash');
        trashButton.innerHTML = '<img src="/src/img/exclude.svg">';
        trashButton.onclick = () => this.deleteStore(this.state);

        div.appendChild(trashButton);

        return div;
    }
}
