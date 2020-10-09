import Component from "../../utils/decorators/component";
import OnInit from "../../utils/interfaces/oninit";

@Component({
    tag: 'spec-avatar-list',
    styleUrl: './spec-avatar-list.component.scss',
    templateUrl: './spec-avatar-list.component.html'
})
export default class SpecAvatarListComponent extends HTMLElement implements OnInit {
    constructor() {
        super();
        this.onInit();     
    }    

    onInit(): void {
    }
}