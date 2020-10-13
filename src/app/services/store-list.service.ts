import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IStore {
  id: number;
  name: string;
  fullAddress: string;
  icon: string;
}

@Injectable({
  providedIn: 'root'
})
export class StoreListService {
  private readonly _url = 'https://next.json-generator.com/api/json/get/Vk-FjTXUK';

  constructor(private http: HttpClient) { }

  fetchStoreList(): Observable<IStore[]> {
    return this.http.get<IStore[]>(this._url);
  }
}
