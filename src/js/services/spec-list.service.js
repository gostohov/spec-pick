export default class SpecListService {
    constructor(url) {
        this.url = url;
    }

    async getSpecList() {
        const response = await fetch(this.url);
        return await response.json();
    }
}