export default class SpecAvatar {
    constructor(state, onselect) {
        this.state = state;
        this.onselect = onselect;

        return this.render();
    }

    render() {
        const el = document.createElement('div');
        el.classList.add('spec__avatar');
        el.innerHTML = `<img src="${this.state.iconUrl || '/src/img/test-avatar.svg'}">`;
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