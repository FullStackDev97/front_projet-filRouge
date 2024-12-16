import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HistoriqueSimulation } from '../../dto/model/historiqueSimulation';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueService {
  private apiUrl = `${environment.apiUrl}/historique`;


  private readonly API_URL = 'http://localhost:8080/api/historique';

  constructor(private http: HttpClient, private userService: UserService) {}

  private getHeaders(): HttpHeaders {
    const token = this.userService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  saveHistorique(userId: number, offreId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/toggle-historique/${userId}/${offreId}`, {}, { headers: this.getHeaders() });
  }

  getHistoriqueSimulationsByUser(userId: number): Observable<HistoriqueSimulation[]> {
    return this.http.get<HistoriqueSimulation[]>(`${this.apiUrl}/${userId}`, { headers: this.getHeaders() });
  }

  addFileForUser(formData: FormData, userId: number|null): Observable<string[]> {
    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${this.userService.getToken()}`
    });
    return this.http.post<string[]>(`${environment.apiUrl}/upload/${userId}`, formData, {headers});
  }

  deleteFile(file: string, userId: number | null) {
    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${this.userService.getToken()}`
    });
    return this.http.delete<string[]>(`${environment.apiUrl}/delete/${userId}/${file}`, {headers});
  }

}
