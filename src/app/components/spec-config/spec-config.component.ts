import { ioc, StoreListService, StateService } from "../../services";
import { Component, OnInit } from "../../utils";

@Component({
    tag: 'spec-config',
    styleUrl: './spec-config.component.scss',
    templateUrl: './spec-config.component.html',
    shadow: true,
    mode: "open"
})
export class SpecConfigComponent extends HTMLElement implements OnInit {
    private _storeListService: StoreListService;
    private _stateService: StateService;
    
    avatar: any;
    containerRef = () => this.shadowRoot?.querySelector('.container');
    colLeft = () => document.querySelector('.left');

    constructor() {
        super();

        this._stateService = ioc.stateService;
        this._storeListService = ioc.storeListService;
        this.onInit();
    }    

    onInit(): void {
        this._stateService.state$.subscribe(({selectedSpecAvatar}) => {
            this.avatar = selectedSpecAvatar;
            this.connectedCallback();
        });
    }
    
    clearView(): void {
        this.containerRef().innerHTML = '';
    }
    
    connectedCallback() {
        if (!this.containerRef()) { return; }

        if (!this.avatar) {
            this._toggleColLeftStyle(false);
            this._renderSpecEmpty();
        } else if (this.avatar && !this.avatar.fullName) {
            this._toggleColLeftStyle(true);
            this._renderSpecPick();
        } else {
            this._toggleColLeftStyle(true);
            this._renderSpecStore();
        }
    }

    private _toggleColLeftStyle(avatarDefined: boolean): void {
        avatarDefined ? this.colLeft().classList.add('shadow') : this.colLeft().classList.remove('shadow');
    }

    private _onchange(e: any): void {
        const specFullName = e.target.value;
        const state = this._stateService.state;
        const specList = state.specList;
        const pickedSpec = specList.find((spec: any) => spec.fullName === specFullName) as { [key: string]: string };
        const newAvatarList = state.avatarList;
        const selectedAvatar = state.selectedSpecAvatar;
        const selectedAvatarIndex = newAvatarList.findIndex(item => item.id === selectedAvatar.id);
        newAvatarList[selectedAvatarIndex] = {
            ...newAvatarList[selectedAvatarIndex],
            iconUrl: pickedSpec.iconUrl,
            fullName: pickedSpec.fullName
        };

        this._stateService.setState({
            avatarList: newAvatarList,
            selectedSpecAvatar: newAvatarList[selectedAvatarIndex]
        });
    }

    private _close(): void {
        // Возвращаем пикнутые магазины обратно в "обойму"
        const selectedAvatar = this._stateService.state.selectedSpecAvatar;
        const storeList = this._stateService.state.storeList;
        const newStoreList = [...storeList, ...selectedAvatar.storeList];
        
        const newAvatarList = this._deleteActiveSpecAvatar();
        this._stateService.setState({ 
            avatarList: newAvatarList,
            storeList: newStoreList,
            selectedSpecAvatar: undefined
        });
    }

    private _deleteActiveSpecAvatar(): any[] {
        const avatarList = this._stateService.state.avatarList;
        return avatarList.filter(avatar => !avatar.selected);
    }

    private _renderSpecEmpty(): void {
        this.containerRef().classList.add('no-spec');
        this.containerRef().classList.remove('select-spec');
        this.containerRef().innerHTML = `<div class="no-spec-alert">
                                            <span class="header">СПЕЦИАЛИСТ НЕ НАЗНАЧЕН</span>
                                            <span class="sub-header">Чтобы начать работу с нераспределенными магазинами, вам необходимо добавить хотя бы одного специалиста</span>
                                            <img src="/assets/img/add-spec.svg" alt="Добавить специалиста">
                                        </div>`;
    }

    private _renderSpecPick(): void {
        this.containerRef().classList.remove('no-spec');
        this.containerRef().classList.add('select-spec');
        this.clearView();

        // создаем разметку
        const button = document.createElement('button');
        button.classList.add('select-spec__close');
        button.innerHTML = 'x';
        button.onclick = () => this._close();

        const div = document.createElement('div');
        div.classList.add('select-spec__wrapper');
        div.innerHTML = '<span class="select-spec__title">Выберите специалиста</span>';

        const input = document.createElement('input');
        input.classList.add('select-spec__input');
        input.setAttribute('type', 'string');
        input.setAttribute('name', 'name');
        input.setAttribute('list', 'select-spec__namelist');
        input.onchange = (e) => this._onchange(e);

        const datalist = document.createElement('datalist');
        datalist.id = 'select-spec__namelist';
        datalist.innerHTML = `
            ${this._stateService.state.specList.map((spec: any) => `<option value="${spec.fullName}">`).join('')}
        `;

        div.appendChild(input);
        div.appendChild(datalist);

        this.containerRef().appendChild(button);
        this.containerRef().appendChild(div);
    }

    private _renderSpecStore(): void {
        const selectedAvatar = this._stateService.state.selectedSpecAvatar;

        this.containerRef().classList.remove('no-spec');
        this.containerRef().classList.add('select-spec');
        this.clearView();

        // создаем разметку
        const closeButton = document.createElement('button');
        closeButton.classList.add('select-spec__close');
        closeButton.innerHTML = 'x';
        closeButton.onclick = () => this._close();

        const wrapper = document.createElement('div');
        wrapper.classList.add('select-spec__wrapper');
        wrapper.innerHTML = '<span class="select-spec__title">Специалист</span>';

        const specConfig = document.createElement('div');
        specConfig.classList.add('spec-config');
        specConfig.innerHTML = `
            <div>
                <img class="spec-config__avatar" src="${selectedAvatar.iconUrl}">
                <span class="spec-config__fullname">${selectedAvatar.fullName}</span>
                <span class="spec-config__store_count">${!selectedAvatar.storeList || !selectedAvatar.storeList.length ? 0 : selectedAvatar.storeList.length} маг.</span>
            </div>
        `;

        const trashButton = document.createElement('button');
        trashButton.classList.add('spec-config__trash');
        trashButton.innerHTML = '<img src="/assets/img/trash-can.svg">';
        trashButton.onclick = () => this._deleteSpec();
        
        specConfig.appendChild(trashButton);

        const specTitle = document.createElement('span');
        specTitle.classList.add('select-spec__title');
        specTitle.innerHTML = 'Магазины';

        let specStore = this._calculateSpecStore(selectedAvatar);

        wrapper.appendChild(specConfig);
        wrapper.appendChild(specTitle);
        wrapper.appendChild(specStore);

        this.containerRef().appendChild(closeButton);
        this.containerRef().appendChild(wrapper);
    }

    private _deleteSpec() {
        const state = this._stateService.state;
        const newAvatarList = state.avatarList;
        const selectedAvatar = state.selectedSpecAvatar;
        const selectedAvatarIndex = newAvatarList.findIndex(item => item.id === selectedAvatar.id);

        // Возвращаем пикнутые магазины обратно в "обойму"
        const storeList = state.storeList;
        const newStoreList = [...storeList, ...selectedAvatar.storeList];
        
        // обнуляем аватара
        newAvatarList[selectedAvatarIndex] = {
            ...newAvatarList[selectedAvatarIndex],
            iconUrl: undefined,
            fullName: undefined,
            storeList: []
        };

        this._stateService.setState({
            storeList: newStoreList,
            avatarList: newAvatarList,
            selectedSpecAvatar: newAvatarList[selectedAvatarIndex]
        });
    }

    private _calculateSpecStore(avatar: any): HTMLElement {
        if (!avatar.storeList || !avatar.storeList.length) {
            const specWarning = document.createElement('div');
            specWarning.classList.add('select-spec__warning');
            specWarning.innerHTML = `
                <span>Не назначены</span>
                <img src="/assets/img/attention.svg" alt="Внимание!">
            `;

            return specWarning;
        } else {
            const div = document.createElement('div');
            div.classList.add('spec-store__list');
            avatar.storeList.forEach((store: any) => {
                const el = this._createStore(store);
                div.appendChild(el);
            })

            return div;
        }
    }

    private _createStore(store: any): HTMLElement {
        const div = document.createElement('div');
        div.classList.add('spec-store');
        div.innerHTML = `
            <div class="spec-store__info">
                <img src="/assets/img/arrow-left.svg">
                <img src="${store.icon}">
                <div class="store-data">
                    <span class="header">${store.name}</span>
                    <span class="sub-header">${store.fullAddress}</span>
                </div>
            </div>
        `;

        const trashButton = document.createElement('button');
        trashButton.classList.add('spec-store__trash');
        trashButton.innerHTML = '<img src="/assets/img/exclude.svg">';
        trashButton.onclick = () => this._deleteFromStoreList(store);

        div.appendChild(trashButton);

        return div;
    }

    private _deleteFromStoreList(store: any) {
        const state = this._stateService.state;
        const newAvatarList = state.avatarList;
        const selectedAvatar = state.selectedSpecAvatar;
        const selectedAvatarIndex = newAvatarList.findIndex(item => item.id === selectedAvatar.id);

        // Возвращаем пикнутый магазин обратно в "обойму"
        const storeList = state.storeList;
        const newStoreList = [...storeList, store];

        // обнуляем аватара
        newAvatarList[selectedAvatarIndex] = {
            ...selectedAvatar,
            storeList: [...selectedAvatar.storeList.filter((item: any) => item.id !== store.id)]
        };

        this._stateService.setState({
            storeList: newStoreList,
            avatarList: newAvatarList,
            selectedSpecAvatar: newAvatarList[selectedAvatarIndex]
        });
    }
}