import { filter } from "rxjs/operators";
import { elements } from "../utils/elements";

export default class StoreListCountComponent {
    constructor(state) {
        this.state = state;
        this.init();
    }

    init() {
        this.state.getState().storeList$
            .pipe(filter(list => list))
            .subscribe(list => {
                this.render(list);
            })
    }

    render(list) {
        // Отобразили количество нераспределенных магазинов
        elements.storeListCount().innerHTML = `
            ${
                list && list.length ? 
                    `<span>
                        Нераспределенные магазины: 
                        <span class="store-list__count-number">${list.length}</span>
                    </span>
                    <img src="/src/img/attention.svg" alt="Внимание!">` :
                    `<span>Нераспределенных магазинов нет!</span>`
            }
        `;
    }
}