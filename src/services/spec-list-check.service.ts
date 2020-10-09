import { injectable } from "inversify";
@injectable()
export class SpecListCheckService {
    private _url = 'https://next.json-generator.com/api/json/get/EyqxVSSIF';

    constructor() {}

    async getSpecList() {
        const response = await fetch(this._url);
        return await response.json();
    }
}