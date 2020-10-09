import { of } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap, catchError } from 'rxjs/operators';
import { StateService } from "./state.service";

export class SpecListService {
    private _url = 'https://next.json-generator.com/api/json/get/EyqxVSSIF';

    constructor() {
    }
    
    /**
    * Получение списка специалистов
    */
    fetchSpecList() {
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
            // response => this._stateService.setState({ specList: response })
        );
    }
}