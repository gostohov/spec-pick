import AppComponent from './app.component';
import SpecConfigComponent from './components/spec-config.component';
import { State } from '../utils/state';
import { SaveChangesButtonComponent, SpecAvatarListComponent } from '../components';
import { SpecListCheckService } from '../services';
import { iocContainer } from '../utils';

/**
 * Класс для внедрения новых зависимостей в приложение
 */
export default class AppModule {
    forRoot() {
        const state = new State();
        /** state **/

        /** services **/
        // const storeListService = new StoreListService('https://next.json-generator.com/api/json/get/Vk-FjTXUK');
        // const specListService = new SpecListService('https://next.json-generator.com/api/json/get/EyqxVSSIF');

        /** components **/
        new AppComponent(state);
        // new StoreListComponent(state, storeListService);
        new SpecConfigComponent(state);

        return {
            components: [
                SaveChangesButtonComponent,
                SpecAvatarListComponent
            ],
            providers: [
                iocContainer,
                SpecListCheckService
            ]
        }

    }
}