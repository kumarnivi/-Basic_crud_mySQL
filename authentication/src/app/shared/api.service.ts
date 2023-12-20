import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://basic-crud-mysql.onrender.com';


 
  constructor(private http: HttpClient) {
  }


  post( url:string, formData: any): Observable<any> {
    return this.http.post(this.apiUrl + url, formData);
  }



}
