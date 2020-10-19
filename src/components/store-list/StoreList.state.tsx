import React from 'react'
import { action, autorun, computed, makeAutoObservable, observable } from 'mobx';
import { Store } from './store/Store';

export interface IStore {
    fullAddress: string;
    icon: string;
    id: number;
    name: string;
}

export default class StoreListState {
    @observable
    storeList: IStore[] = [];

    constructor() {
        makeAutoObservable(this);
        autorun(() => this.fetchData())
    }

    @action
    setStoreList(list: IStore[]) {
        this.storeList = list;
    }

    @action
    pickStore(store: IStore) {
        // if (!this.selectedAvatar || !this.selectedAvatar.fullName) {
        //     alert('Пожалуйста, выберите специалиста');
        //     return;
        // }
        
        // const newStoreList = this.storeList.filter(item => item.id !== store.id);
        // const selectedAvatarIndex = this.avatarList.findIndex(item => item.id === this.selectedAvatar.id);
        // const newAvatarList = [...this.avatarList];
        // newAvatarList[selectedAvatarIndex] = {
        //     ...newAvatarList[selectedAvatarIndex],
        //     storeList: [
        //         ...newAvatarList[selectedAvatarIndex].storeList,
        //         { ...store }
        //     ]
        // };
        // this._stateService.setState({
        //     storeList: newStoreList,
        //     selectedSpecAvatar: newAvatarList[selectedAvatarIndex],
        //     avatarList: newAvatarList
        // });
    }

    @computed
    get storeListEl(): JSX.Element[] {
        return this.storeList.map(item => <Store key={item.id} state={item} pickStore={(store: IStore) => this.pickStore(store)}/>)
    }

    async fetchData() {
        const url = 'https://next.json-generator.com/api/json/get/Vk-FjTXUK';
        try {
            const response = await fetch(url);
            const storeList = await response.json();
            this.setStoreList(storeList);
        } catch (error) {
            console.log(error);
        }
    }
}

