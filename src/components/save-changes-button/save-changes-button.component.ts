import { Component, OnInit } from "../../utils";

@Component({
    tag: 'save-changes-button',
    styleUrl: './save-changes-button.component.scss',
    templateUrl: './save-changes-button.component.html'
})
export class SaveChangesButtonComponent extends HTMLElement implements OnInit {
    constructor() {
        super();
        this.onInit();        
    }    
    
    onInit(): void {
    }
}