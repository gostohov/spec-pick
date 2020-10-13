import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ISpec {
  id: number;
  fullName: string;
  iconUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class SpecListService {
  private readonly _url = 'https://next.json-generator.com/api/json/get/EyqxVSSIF';

  constructor(private http: HttpClient) { }

  fetchSpecList(): Observable<ISpec[]> {
    return this.http.get<ISpec[]>(this._url);
  }
}
