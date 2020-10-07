import AppComponent from './app.component';
import SaveChangesComponents from './components/save-changes.component';
import SpecAvatarListComponent from './components/spec-avatar-list.component';
import SpecConfigComponent from './components/spec-config.component';
import StoreListCountComponent from './components/store-list-count.component';
import StoreListComponent from './components/store-list.component';
import SpecListService from './services/spec-list.service';
import StoreListService from './services/store-list.service';
import { State } from './utils/state';

/**
 * Класс для внедрения новых зависимостей в приложение
 */
export default class AppModule {
    forRoot() {
        /** state **/
        const state = new State();

        /** services **/
        const storeListService = new StoreListService('https://next.json-generator.com/api/json/get/Vk-FjTXUK');
        const specListService = new SpecListService('https://next.json-generator.com/api/json/get/EyqxVSSIF');

        /** components **/
        new AppComponent(state);
        new StoreListComponent(state, storeListService);
        new SpecAvatarListComponent(state, specListService);
        new SpecConfigComponent(state);
        new SaveChangesComponents(state);
        new StoreListCountComponent(state);

    }
}