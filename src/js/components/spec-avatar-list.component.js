import { elements } from "../utils/elements";
import { filter } from 'rxjs/operators';
import SpecAvatar from "./spec-avatar.component";

export default class SpecAvatarListComponent {
    constructor(state, specListService) {
        this.state = state;
        this.specListService = specListService;
        this.avatarList = [];   
        this.init();
    }

    init() {
        // подписка на изменение списка аватарок
        this.state.getState().avatarList$.pipe(
            filter(list => list)
        ).subscribe(list => {
            this.avatarList = list;
            this.render(list);
        });

        // повесили функцию на клик по кнопке
        elements.addSpecButton().onclick = () => this.addAvatar();

        // загружаем список специалистов с бека
        this.fetchSpecList();
    }

    /**
     * Получение списка специалистов
     */
    async fetchSpecList() {
        try {
            // сохраняем список специалистов в state
            const specList = await this.specListService.getSpecList();
            this.state.getState().specList$.next(specList);
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Добавляет аватарку нового специалиста
     */
    addAvatar() {
        const avatarList = this.state.getState().avatarList$.getValue() || [];

        const newAvatar = {
            id: avatarList && avatarList.length ? avatarList.length : 0,
            fullName: undefined,
            iconUrl: undefined,
            storeList: [],

            // options
            selected: true
        };
        const newAvatarList = [
            ...avatarList.map(item => {
                item.selected = false;
                return item;
            }), 
            newAvatar
        ];
        // сохраняем выбраный аватар
        this.state.getState().selectedSpecAvatar$.next(newAvatar);
        this.state.getState().avatarList$.next(newAvatarList);
    }

    clearView() {
        elements.avatarSpecList().innerHTML = '';
    }

    /**
     * Выбор аватарки специалиста
     * @param avatar объект аватар
     */
    onselect(avatar) {
        const avatarList = this.state.getState().avatarList$.getValue();
        avatarList.forEach(item => item.selected = item.id === avatar.id);
        // сохраняем выбраный аватар
        this.state.getState().selectedSpecAvatar$.next(avatar);
        this.state.getState().avatarList$.next(avatarList);
    }

    render(list) {
        this.clearView();
        list.forEach(item => {
            const specAvatar = new SpecAvatar(item, (avatar) => this.onselect(avatar));
            elements.avatarSpecList().appendChild(specAvatar);
        })
    }
}