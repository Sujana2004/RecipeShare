import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private url="http://localhost:5000/get";

  constructor(private http:HttpClient) {  
    
  }
  getData(){
    return this.http.get(this.url);
  }
}
