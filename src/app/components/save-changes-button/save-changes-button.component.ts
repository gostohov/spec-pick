import { ioc, StateService } from "../../services";
import { Component, OnInit } from "../../utils";

@Component({
    tag: 'save-changes-button',
    styleUrl: './save-changes-button.component.scss',
    templateUrl: './save-changes-button.component.html'
})
export class SaveChangesButtonComponent extends HTMLElement implements OnInit {
    private _stateService: StateService;

    constructor() {
        super();
        this._stateService = ioc.stateService;
        this.onInit();        
    }   
    
    saveChanges() {
        const storeList = this._stateService.state.storeList;
        if (storeList.length !== 0) {
            alert(`Пожалуйста, распределите оставшиеся ${storeList.length} маг.`);
        } else if (storeList.length === 0) {
            alert('Данные успешно сохранены!');
            window.location.reload();
        }
    }

    connectedCallback() {
        this.onclick = () => this.saveChanges();
    }
    
    onInit(): void {
    }
}