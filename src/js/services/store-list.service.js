export default class StoreListService {
    constructor(url) {
        this.url = url;
    }

    async getStoreList() {
        const response = await fetch(this.url);
        return await response.json();
    }
}