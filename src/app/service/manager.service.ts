import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Manager } from '../models/manager';
import { ApiResponse } from '../models/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  //private http = inject(HttpClient);
  url='http://127.0.0.1:8000/api/managers';
  constructor(private http:HttpClient) { }

  getAll(){
    //return this.http.get<Category[]>(this.url);
    return this.http.get<ApiResponse<Manager[]>>(this.url);
  }

  getAllManagers(){
    return this.http.get<ApiResponse<Manager[]>>(this.url);
  }

  getManager(id: number): Observable<ApiResponse<Manager>> {
    return this.http.get<ApiResponse<Manager>>(this.url+'/'+id);
  }

  createManager(manager: Manager): Observable<any> {
    return this.http.post(this.url,manager);
  }

  updateManager(id: number, manager: Manager): Observable<any> {
    return this.http.put(this.url+'/'+id, manager);
  }

  deleteManager(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(this.url+'/'+id);
  }
}
