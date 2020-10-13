import { Component, OnInit } from '@angular/core';
import { map, switchMap, tap } from 'rxjs/operators';
import { ISpec, SpecListService } from 'src/app/services/spec-list.service';
import { IAvatar, StateService } from 'src/app/services/state.service';
import { IStore } from 'src/app/services/store-list.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {
  avatarList: IAvatar[];
  specList: ISpec[];
  storeList: IStore[];

  constructor(
    private _specListService: SpecListService,
    private _stateService: StateService
  ) { }

  ngOnInit(): void {
    this._specListService.fetchSpecList().pipe(
      tap(console.log),
      tap(list => this._stateService.setState({ specList: list })),
      switchMap(() => this._stateService.state$.pipe(
        map(state => {
          this.avatarList = state.avatarList;
          this.specList = state.specList;
          this.storeList = state.storeList;
        })
      ))
    ).subscribe();
  }

  addAvatar(): void {
    const newAvatar = {
      id: this.avatarList?.length || 0,
      fullName: undefined,
      iconUrl: '../../../assets/img/test-avatar.svg',
      storeList: [],
      selected: true
    };
    const newAvatarList = [
      ...this.avatarList.map(item => {
        item.selected = false;
        return item;
      }),
      newAvatar
    ];
    this._stateService.setState({
      selectedSpecAvatar: newAvatar,
      avatarList: newAvatarList
    });
  }

  selectAvatar(avatar: IAvatar): void {
    const newAvatarList = this.avatarList.map(item => {
      if (item.id === avatar.id) {
        item.selected = true;
      } else {
        item.selected = false;
      }
      return item;
    });
    this._stateService.setState({
      selectedSpecAvatar: avatar,
      avatarList: newAvatarList
    });
  }

  saveChanges(): void {
    if (this.storeList.length > 0) {
      alert(`Пожалуйста, распределите оставшиеся ${this.storeList.length} маг.`);
    } else {
      alert('Данные успешно сохранены!');
      window.location.reload();
    }
  }
}
