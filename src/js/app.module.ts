import AppComponent from './app.component';
import SpecConfigComponent from './components/spec-config.component';
import { State } from '../utils/state';
import { SaveChangesButtonComponent, SpecAvatarListComponent } from '../components';
import { StoreListService } from '../services';

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
                StoreListService,
                
            ]
        }

    }
}