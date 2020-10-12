import { filter, map, tap } from "rxjs/operators";
import { ioc, SpecListService, StateService } from "../../services";
import { Component, OnInit } from "../../utils";

@Component({
    tag: 'spec-avatar-list',
    styleUrl: './spec-avatar-list.component.scss',
    templateUrl: './spec-avatar-list.component.html',
    shadow: true,
    mode: 'open'
})
export class SpecAvatarListComponent extends HTMLElement implements OnInit {
    private _specListService: SpecListService;
    private _stateService: StateService;

    avatarList: [];
    avatarSpecList = () => this.shadowRoot?.querySelector('.spec-avatar__list');

    constructor() {
        super();

        this._stateService = ioc.stateService;
        this._specListService = ioc.specListService;
        this.onInit();     
    }    

    onInit(): void {
        this._stateService.state$
            .pipe(
                map(({ avatarList }: any) => avatarList),
                filter((list: any) => list),
                tap(list => {
                    this.avatarList = list;
                    this.connectedCallback();
                })
            ).subscribe();
        this._specListService.fetchSpecList();
    }

    clearView(): void {
        this.avatarSpecList()!.innerHTML = '';
    }

    selectAvatar(avatar: any): void {
        const newAvatarList = this._stateService.state.avatarList.map((item: any) => {
            if (item.id == avatar.id) {
                item.selected = true;
            } else {
                item.selected = false;
            }
            return item;
        });

        this._stateService.setState({ 
            avatarList: newAvatarList,
            selectedSpecAvatar: avatar
        });
    }

    connectedCallback() {
        if (!this.avatarSpecList()) { return; }

        this.clearView();
        this.avatarList.forEach((item: any) => {
            const template = document.createElement('template');
            template.innerHTML = `<spec-avatar  id="${item.id}" 
                                                iconUrl="${item.iconUrl || ''}" 
                                                storeListCount="${item.storeList?.length || ''}"
                                                selected="${item.selected || ''}"></spec-avatar>`;
            template.content.lastChild.addEventListener('click', () => this.selectAvatar(item));
            this.avatarSpecList().appendChild(template.content);
        });
    }
}