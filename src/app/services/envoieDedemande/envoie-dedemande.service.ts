import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {EnvoieDedemande} from "../../dto/model/envoieDedemande";

@Injectable({
  providedIn: 'root'
})
export class EnvoieDedemandeService {

  private apiUrl = `${environment.apiUrl}/envoieDedemandes`;

  constructor(private http: HttpClient) { }

  getAllEnvoieDedemandes(): Observable<EnvoieDedemande[]> {
    return this.http.get<EnvoieDedemande[]>(this.apiUrl);
  }

  getEnvoieDedemande(id: number): Observable<EnvoieDedemande> {
    return this.http.get<EnvoieDedemande>(`${this.apiUrl}/${id}`);
  }

  createEnvoieDedemande(envoieDedemande: EnvoieDedemande): Observable<number> {
    return this.http.post<number>(this.apiUrl, envoieDedemande, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  updateEnvoieDedemande(id: number, envoieDedemande: EnvoieDedemande): Observable<number> {
    return this.http.put<number>(`${this.apiUrl}/${id}`, envoieDedemande, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  deleteEnvoieDedemande(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
