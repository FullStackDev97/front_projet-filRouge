import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {OffreImmobilier} from "../../dto/model/offreImmobilier";

@Injectable({
  providedIn: 'root'
})
export class FavorisService {

  private apiUrl = 'http://localhost:8080/api/favoris';

  constructor(private http: HttpClient) {}

  toggleFavoris(userId: number, offreId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/toggle/${userId}/${offreId}`, {});
  }

  isFavori(userId: number, offreId: number | undefined): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/isFavori/${userId}/${offreId}`);
  }

  getFavoris(userId: number): Observable<OffreImmobilier[]> {
    return this.http.get<OffreImmobilier[]>(`${this.apiUrl}/${userId}`);
  }
}
