// import { elements, insertAfter } from '../utils/elements';
// import { setState } from '../utils/state';

// export const selectSpec = (el, index) => {
//     // де-селектим предыдущий выбранный элемент
//     const oldSelected = elements.avatarSpecSelected();
//     if (oldSelected) {
//         oldSelected.classList.remove('selected');
//         oldSelected.removeChild(elements.avatarSpecSpacer());
//     }

//     // поменяли DOM
//     el.classList.add('selected');
//     const spacer = document.createElement('div');
//     spacer.classList.add('spec-avatar__spacer');
//     el.appendChild(spacer);

//     // сохраняем id выбранного специалиста в state
//     setState({ selectedSpecIndex: index });
// }

// export const addAvatar = (index) => {
//     const avatarDiv = document.createElement('div');
//     avatarDiv.classList.add('spec__avatar');
//     avatarDiv.innerHTML = `<img src="/src/img/test-avatar.svg">`;
//     avatarDiv.onclick = () => selectSpec(avatarDiv, index);

//     const list = elements.avatarSpecList();
//     if (list && list.length) {
//         const refNode = list[list.length - 1];  
//         insertAfter(refNode, avatarDiv);
//     } else {
//         // Значит пользователь хочет выбрать первого специалиста
//         elements.leftControl().insertBefore(avatarDiv, elements.addSpecControl());

        // // Т.к. теперь у пользователя есть аватар на выбор, открываем окно для конфигурирования специалиста
        // elements.colSelectSpec().classList.remove('no-spec');
        // elements.colSelectSpec().classList.add('select-spec');
        // elements.colSelectSpec().innerHTML = `
        //     <div class="select-spec__wrapper">
        //         <span class="select-spec__title">Специалист</span>
        //         <div class="spec-config">
        //         <div>
        //             <img class="spec-config__avatar" src="/src/img/samoilof.svg">
        //             <span class="spec-config__fullname">Самойлов Алексей</span>
        //             <span class="spec-config__store_count">0 магазинов</span>
        //         </div>
        //         <button class="spec-config__trash"><img src="/src/img/trash-can.svg"></button>
        //         </div>
        //         <span class="select-spec__title">Магазины</span>
        //         <div class="select-spec__warning">
        //         <span>Не назначены</span>
        //         <img src="/src/img/attention.svg" alt="Внимание!">
        //         </div>
        //     </div>
        // `;
//     }
//     // сразу делаем активируем нового специалиста
//     selectSpec(avatarDiv, index);
// };