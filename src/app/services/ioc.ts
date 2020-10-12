/**
 * Да это дерево зависимостей
 * 
 * to-do сделать DI
 */

import { SpecListService } from './spec-list.service';
import { StoreListService } from './store-list.service';
import { StateService } from './state.service'

class IoC {
    stateService: StateService;
    storeListService: StoreListService;
    specListService: SpecListService;

    constructor() {
        this.stateService = new StateService();
        this.storeListService = new StoreListService(this.stateService);
        this.specListService = new SpecListService(this.stateService);
    }
}

export const ioc = new IoC();