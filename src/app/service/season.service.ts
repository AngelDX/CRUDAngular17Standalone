import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../models/category';
import { Season } from '../models/season';

@Injectable({
  providedIn: 'root'
})
export class SeasonService {

  //private http = inject(HttpClient);
  url='http://127.0.0.1:8000/api/seasons';
  constructor(private http:HttpClient) { }

  getAll(){
    //return this.http.get<Category[]>(this.url);
    return this.http.get<ApiResponse<Season[]>>(this.url);
  }
}
