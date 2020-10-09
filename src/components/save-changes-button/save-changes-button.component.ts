import Component from "../../utils/decorators/component";
import OnInit from "../../utils/interfaces/oninit";

@Component({
    tag: 'save-changes-button',
    styleUrl: './save-changes-button.component.scss',
    templateUrl: './save-changes-button.component.html'
})
export default class SaveChangesButtonComponent extends HTMLElement implements OnInit {
    constructor() {
        super();
        this.onInit();        
    }    

    onInit(): void {
    }
}