import { Component, OnInit } from "../../utils";
@Component({
    tag: 'spec-avatar-list',
    styleUrl: './spec-avatar-list.component.scss',
    templateUrl: './spec-avatar-list.component.html'
})
export class SpecAvatarListComponent extends HTMLElement implements OnInit {
    constructor(
    ) {
        super();
        this.onInit();     
    }    

    onInit(): void {
    }
}