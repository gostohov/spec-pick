import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { IAvatar, StateService } from 'src/app/services/state.service';
import { IStore, StoreListService } from 'src/app/services/store-list.service';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.scss']
})
export class StoreListComponent implements OnInit {
  storeList$: Observable<IStore[]>
  storeList: IStore[];
  selectedAvatar: IAvatar;
  avatarList: IAvatar[];

  constructor(
    private _storeListService: StoreListService,
    private _stateService: StateService
  ) { }

  ngOnInit(): void {
    this.storeList$ = this._storeListService.fetchStoreList().pipe(
      tap(list => this._stateService.setState({ storeList: list })),
      switchMap(() => this._stateService.state$.pipe(
        map(state => {
          this.storeList = state.storeList;
          this.selectedAvatar = state.selectedSpecAvatar;
          this.avatarList = state.avatarList;
          return state.storeList;
        })
      ))
    );
  }

  pickStore(store: IStore): void {
    if (!this.selectedAvatar || !this.selectedAvatar.fullName) {
        alert('Пожалуйста, выберите специалиста');
        return;
    }

    const newStoreList = this.storeList.filter(item => item.id !== store.id);
    const selectedAvatarIndex = this.avatarList.findIndex(item => item.id === this.selectedAvatar.id);
    const newAvatarList = [...this.avatarList];
    newAvatarList[selectedAvatarIndex] = {
        ...newAvatarList[selectedAvatarIndex],
        storeList: [
            ...newAvatarList[selectedAvatarIndex].storeList,
            { ...store }
        ]
    };
    this._stateService.setState({
      storeList: newStoreList,
      selectedSpecAvatar: newAvatarList[selectedAvatarIndex],
      avatarList: newAvatarList
    });
  }

}
