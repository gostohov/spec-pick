import { Component, OnInit } from "../../utils";
import { ioc, StateService } from "../../services";

@Component({
    tag: 'spec-avatar-add',
    styleUrl: './spec-avatar-add.component.scss',
    templateUrl: './spec-avatar-add.component.html',
    mode: "open",
    shadow: true
})
export class SpecAvatarAddComponent extends HTMLElement implements OnInit {
    private _stateService: StateService;

    constructor() {
        super();
        this._stateService = ioc.stateService;
        this.onInit();
    }    

    onInit(): void {
    }

    /**
     * Добавляет аватарку нового специалиста
     */
    addAvatar() {
        const avatarList = this._stateService.state.avatarList;

        const newAvatar: {
            [key: string]: any;
        } = {
            id: avatarList && avatarList.length ? avatarList.length : 0,
            fullName: undefined,
            iconUrl: undefined,
            storeList: [],

            // options
            selected: true
        };
        const newAvatarList = [
            ...avatarList.map((item: any) => {
                item.selected = false;
                return item;
            }), 
            newAvatar
        ];
        // сохраняем выбраный аватар
        this._stateService.setState({ 
            selectedSpecAvatar: newAvatar,
            avatarList: newAvatarList
        });
    }

    connectedCallback() {
        this.shadowRoot.querySelector('button').onclick = () => this.addAvatar();
    }
}