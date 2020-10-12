import { of } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { catchError, switchMap } from "rxjs/operators";
import { StateService } from "./state.service";

export class StoreListService {
    private _url = 'https://next.json-generator.com/api/json/get/Vk-FjTXUK';
    private _stateService: StateService;

    constructor(stateService: StateService) {
        this._stateService = stateService;
    }
    
    /**
    * Получение списка специалистов
    */
    fetchStoreList() {
        fromFetch(this._url).pipe(
            switchMap(response => { 
                if (response.ok) {
                    return response.json();
                } else {
                    return of({ error: true, message: `Error ${response.status}` });
                }
            }),
            catchError(err => {
                console.error(err);
                return of({ error: true, message: err.message })
            })
        ).subscribe(
            response => this._stateService.setState({ storeList: response })
        );
    }
}