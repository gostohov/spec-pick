import { Component, OnInit } from "../../utils";
import { ioc, StateService } from "../../services";

@Component({
    tag: 'spec-avatar',
    styleUrl: './spec-avatar.component.scss',
    templateUrl: './spec-avatar.component.html',
    shadow: true,
    mode: 'open'
})
export class SpecAvatarComponent extends HTMLElement implements OnInit {
    private _stateService: StateService;

    private _state: { [key:string]: any } = {
        iconUrl: '/assets/img/test-avatar.svg',
        storeListCount: null,
        selected: false,
        id: 0
    };

    constructor() {
        super();
        this._stateService = ioc.stateService;
        this.onInit();
    }    

    onInit(): void {
        Object.keys(this._state).map(key => {
            const attr = this.getAttribute(key);
            if (attr && attr.length) {
                this._state[key] = attr
            }
        });
    }

    connectedCallback() {
        const root = this.shadowRoot.querySelector('.spec__avatar') as any;
        this.shadowRoot.querySelector('img').src = this._state.iconUrl;
        
        if (this._state.storeListCount) {
            const template = document.createElement('template');
            template.innerHTML = `<div class="spec-counter__wrapper">
                                    <span class="spec-counter">${this._state.storeListCount}</span>
                                  </div>`;
            root.appendChild(template.content);
        }

        if (this._state.selected) {
            root.classList.add('selected');
            const spacer = document.createElement('div');
            spacer.classList.add('spec-avatar__spacer');
            root.appendChild(spacer);
        }
    }
}