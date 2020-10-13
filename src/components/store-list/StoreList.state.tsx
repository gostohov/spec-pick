import React from 'react'
import { action, autorun, computed, observable } from 'mobx';
import { Store } from './store/Store';

export interface IStore {
    ullAddress: string;
    icon: string;
    id: number;
    name: string;
}

export default class StoreListState {
    @observable
    storeList: IStore[] = [];

    constructor() {
        autorun(() => this.fetchData())
    }

    @action
    setStoreList(list: IStore[]) {
        this.storeList = list;
    }

    @computed
    get storeListEl(): JSX.Element[] {
        return this.storeList.map(item => <Store key={item.id}/>)
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

