export default class SpecAvatar {
    constructor(state, onselect) {
        this.state = state;
        this.onselect = onselect;

        return this.render();
    }

    render() {
        const storeListNumber = this.state.storeList.length;
        const el = document.createElement('div');
        el.classList.add('spec__avatar');
        el.innerHTML = `
            <img src="${this.state.iconUrl || '/src/img/test-avatar.svg'}">
            ${
                    storeListNumber ? 
                    `<div class="spec-counter__wrapper">
                        <span class="spec-counter">${storeListNumber}</span>
                    </div>` : ''
            }
        `;
        el.onclick = () => this.onselect(this.state);

        if (this.state.selected) {
            el.classList.add('selected');
            const spacer = document.createElement('div');
            spacer.classList.add('spec-avatar__spacer');
            el.appendChild(spacer);
        }

        return el;
    }
}