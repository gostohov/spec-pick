import { Component, OnInit } from '@angular/core';
import { ISpec } from 'src/app/services/spec-list.service';
import { IAvatar, StateService } from 'src/app/services/state.service';
import { IStore } from 'src/app/services/store-list.service';

@Component({
  selector: 'app-spec-config',
  templateUrl: './spec-config.component.html',
  styleUrls: ['./spec-config.component.scss']
})
export class SpecConfigComponent implements OnInit {
  selectedAvatar: IAvatar;
  specList: ISpec[];
  avatarList: IAvatar[];
  storeList: IStore[];

  constructor(
    private _stateService: StateService
  ) { }

  ngOnInit(): void {
    this._stateService.state$.subscribe(({ selectedSpecAvatar, specList, avatarList, storeList }) => {
      this.specList = specList;
      this.selectedAvatar = selectedSpecAvatar;
      this.avatarList = avatarList;
      this.storeList = storeList;
    });
  }

  setSpecToAvatar(e: any): void {
    const specFullName = e.target.value;
    const pickedSpec = this.specList.find(spec => spec.fullName === specFullName);
    const newAvatarList = [...this.avatarList];
    const selectedAvatarIndex = newAvatarList.findIndex(item => item.id === this.selectedAvatar.id);
    newAvatarList[selectedAvatarIndex] = {
      ...newAvatarList[selectedAvatarIndex],
        iconUrl: pickedSpec.iconUrl,
        fullName: pickedSpec.fullName
      };

    this._stateService.setState({
      avatarList: newAvatarList,
      selectedSpecAvatar: newAvatarList[selectedAvatarIndex]
    });
  }

  deleteFromStoreList(store: IStore): void {
    const newAvatarList = [...this.avatarList];
    const selectedAvatarIndex = newAvatarList.findIndex(item => item.id === this.selectedAvatar.id);

    // Возвращаем пикнутый магазин обратно в "обойму"
    const newStoreList = [...this.storeList, store];

    // обнуляем аватара
    newAvatarList[selectedAvatarIndex] = {
        ...this.selectedAvatar,
        storeList: [...this.selectedAvatar.storeList.filter(item => item.id !== store.id)]
    };

    this._stateService.setState({
      storeList: newStoreList,
      avatarList: newAvatarList,
      selectedSpecAvatar: newAvatarList[selectedAvatarIndex]
    });
  }

  deleteSpec(): void {
    const newAvatarList = [...this.avatarList];
    const selectedAvatarIndex = newAvatarList.findIndex(item => item.id === this.selectedAvatar.id);

    // Возвращаем пикнутые магазины обратно в "обойму"
    const newStoreList = [...this.storeList, ...this.selectedAvatar.storeList];

    // обнуляем аватара
    newAvatarList[selectedAvatarIndex] = {
      ...newAvatarList[selectedAvatarIndex],
      iconUrl: '../../../assets/img/test-avatar.svg',
      fullName: undefined,
      storeList: []
    };

    this._stateService.setState({
      storeList: newStoreList,
      avatarList: newAvatarList,
      selectedSpecAvatar: newAvatarList[selectedAvatarIndex]
    });
}

  onclose(): void {
    // Возвращаем пикнутые магазины обратно в "обойму"
    const newStoreList = [...this.storeList, ...this.selectedAvatar.storeList];
    const newAvatarList = this.avatarList.filter(avatar => !avatar.selected);
    console.log(newStoreList);
    this._stateService.setState({
      avatarList: newAvatarList,
      storeList: newStoreList,
      selectedSpecAvatar: undefined
    });
};
}
