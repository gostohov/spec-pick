import { SERVICE_IDENTIFIER, SpecListCheckService } from "../../services";
import { Component, iocContainer, OnInit } from "../../utils";
@Component({
    tag: 'spec-avatar-list',
    styleUrl: './spec-avatar-list.component.scss',
    templateUrl: './spec-avatar-list.component.html'
})
export class SpecAvatarListComponent extends HTMLElement implements OnInit {
    private specListCheckService: SpecListCheckService;

    constructor() {
        super();
        this.specListCheckService = iocContainer.get<SpecListCheckService>(SERVICE_IDENTIFIER.SpecListCheckService);
        this.onInit();     
    }    

    onInit(): void {
    }
}