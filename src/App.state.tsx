import { observable } from 'mobx';
import StoreListState from './components/store-list/StoreList.state';

export class AppState {
  @observable 
  storeListState = new StoreListState();
}