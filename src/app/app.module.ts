import { SaveChangesButtonComponent, SpecAvatarAddComponent, SpecAvatarComponent, SpecAvatarListComponent, SpecConfigComponent, StoreListComponent } from './components';

/**
 * Класс для внедрения новых зависимостей в приложение
 */
export default class AppModule {
    /**
     * Пригодится для будущего DI
     */
    forRoot() {
        return {
            components: [
                SaveChangesButtonComponent,
                SpecAvatarListComponent,
                SpecAvatarComponent,
                SpecAvatarAddComponent,
                StoreListComponent,
                SpecConfigComponent,
            ]
        }
    }
}