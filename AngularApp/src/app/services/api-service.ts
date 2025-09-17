import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://localhost:7220/api/counter';
  private userId: string;

  constructor(private http: HttpClient) {
    // Generate or reuse a userId for this session
    let storedId = sessionStorage.getItem('userId');
    if (!storedId) {
      storedId = crypto.randomUUID();
      sessionStorage.setItem('userId', storedId);
    }
    this.userId = storedId;
  }

  //Global APIs
  getGlobal(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/global`);
  }

  incrementGlobal(): Observable<number> {
    return this.http.post<number>(`${this.apiUrl}/global/increment`, {});
  }

  //User APIs
  getUser(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/user/${this.userId}`);
  }

  incrementUser(): Observable<number> {
    return this.http.post<number>(`${this.apiUrl}/user/${this.userId}/increment`, {});
  }

}
