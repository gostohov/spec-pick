import { State } from "../utils/state";

export default class AppComponent {
    private state: State;

    constructor(state: State) {
        this.state = state;
        this.init();
    }

    init() {
        /** код **/        
    }
}