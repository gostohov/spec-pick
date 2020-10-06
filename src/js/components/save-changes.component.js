import { elements } from "../utils/elements";

export default class SaveChangesComponents {
    constructor(state) {
        this.state = state;
        this.render();
    }

    saveChanges() {
        const storeList = this.state.getState().storeList$.getValue();
        if (storeList.length !== 0) {
            alert(`Пожалуйста, распределите оставшиеся ${storeList.length} маг.`);
        } else if (storeList.length === 0) {
            alert('Данные успешно сохранены!');
            window.location.reload();
        }
    }

    render() {
        const button = document.createElement('button');
        button.classList.add('save-changes__button');
        button.innerHTML = `
            <span class="save-changes__message">Сохранить изменения</span>
            <img src="/src/img/check.svg" alt="Сохранить изменения">
        `
        button.onclick = () => this.saveChanges();
        elements.controls().appendChild(button)
    }
}