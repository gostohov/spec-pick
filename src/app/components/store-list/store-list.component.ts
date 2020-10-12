import { filter, map, tap } from "rxjs/operators";
import { ioc, StoreListService, StateService } from "../../services";
import { Component, OnInit } from "../../utils";

@Component({
    tag: 'store-list',
    styleUrl: './store-list.component.scss',
    templateUrl: './store-list.component.html',
})
export class StoreListComponent extends HTMLElement implements OnInit {
    private _storeListService: StoreListService;
    private _stateService: StateService;

    storeList: [];
    storeListRef = () => this.querySelector('.store-list');
    storeListCountRef = () => this.querySelector('.store-list__count');

    constructor() {
        super();

        this._stateService = ioc.stateService;
        this._storeListService = ioc.storeListService;
        this.onInit();     
    }    

    onInit(): void {
        this._stateService.state$
            .pipe(
                map(({ storeList }: any) => storeList),
                filter((list: any) => list),
                tap(list => {
                    this.storeList = list;
                    this.connectedCallback();
                })
            ).subscribe();
        this._storeListService.fetchStoreList();
    }

    clearView(): void {
        this.storeListRef().innerHTML = '';
    }

    connectedCallback() {
        if (!this.storeListRef() || !this.storeListCountRef()) { return; }

        this.clearView();
        this._renderStoreListCount();
        this._renderStoreList();
    }

    private _renderStoreListCount(): void {
        this.storeListCountRef()!.innerHTML = `
            ${
                this.storeList && this.storeList.length ? 
                    `<span>
                        Нераспределенные магазины: 
                        <span class="store-list__count-number">${this.storeList.length}</span>
                    </span>
                    <img src="/assets/img/attention.svg" alt="Внимание!">` :
                    `<span>Нераспределенных магазинов нет!</span>`
            }
        `;
    }

    private _renderStoreList(): void {
        this.storeList.forEach((item: any) => {
            const template = document.createElement('template');
            template.innerHTML = `<div class="store">
                                    <img src="/assets/img/arrow-left.svg">
                                    <img src="${item.icon}">
                                    <div class="store-data">
                                        <span class="header">${item.name}</span>
                                        <span class="sub-header">${item.fullAddress}</span>
                                    </div>
                                </div>`;
            const div = template.content;
            div.lastChild!.addEventListener('click', () => this._addStoreToSpec(item) );
            this.storeListRef()!.appendChild(div);
        });
    }

    private _addStoreToSpec(store: any) {
        const newAvatarList = this._stateService.state.avatarList;
        const selectedAvatar = this._stateService.state.selectedSpecAvatar;
        if (!selectedAvatar || !selectedAvatar.fullName) {
            alert('Пожалуйста, выберите специалиста');
            return;
        }

        const selectedAvatarIndex = newAvatarList.findIndex((item: any) => item.id === selectedAvatar.id);
        const newAvatar = {
            ...newAvatarList[selectedAvatarIndex] as Object,
            storeList: [
                ...newAvatarList[selectedAvatarIndex].storeList,
                { ...store }
            ]
        };

        newAvatarList[selectedAvatarIndex] = newAvatar;
        const newStoreList = this._deleteStoreFromStoreList(store);

        this._stateService.setState({
            avatarList: newAvatarList,
            selectedSpecAvatar: newAvatarList[selectedAvatarIndex],
            storeList: newStoreList
        });
    }

    private _deleteStoreFromStoreList(store: any): any[] {
        const storeList = this._stateService.state.storeList;
        return storeList.filter((item: any) => item.id !== store.id);
    }
}