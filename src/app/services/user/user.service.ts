import { Injectable } from '@angular/core';
import { User } from "../../dto/model/user";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, Observable } from "rxjs";

interface El {
  eligible: boolean
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  register(user: User): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<User>(`${this.apiUrl}/register`, user, { headers });
  }

  getUser(id: number|null): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  createUser(user: User): Observable<number> {
    return this.http.post<number>(`${this.apiUrl}/users`, user);
  }

  updateUser(id: number, user: User): Observable<number> {
    return this.http.put<number>(`${this.apiUrl}/users/${id}`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`);
  }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(`${this.apiUrl}/authenticate`, { email: username, motDePasse: password }, { headers })
      .pipe(
        map(response => {
          localStorage.setItem('token', response.token);
          console.log(response.userId, " ##################")
          localStorage.setItem('userId', response.userId);
          return response;
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserId(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? Number(userId) : null;
  }

  checkEligibilitie(userId: number, offreId: number): Observable<El> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    });
    return this.http.post<El>(`${this.apiUrl}/elegibilitie/${userId}/${offreId}`, {}, { headers });
  }
}
