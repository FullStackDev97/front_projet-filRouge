import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {OffreImmobilier} from "../../dto/model/offreImmobilier";
import {OffreImmobilierResponse} from "../../dto/model/offreImmobilierResponse";

@Injectable({
  providedIn: 'root'
})
export class OffreImmobilierService {

  private apiUrl = `${environment.apiUrl}/offreImmobiliers`;

  constructor(private http: HttpClient) { }

  getAllOffreImmobiliers(): Observable<OffreImmobilier[]> {
    return this.http.get<OffreImmobilier[]>(this.apiUrl);
  }

  getOffreImmobilier(id: number): Observable<OffreImmobilierResponse> {
    return this.http.get<OffreImmobilierResponse>(`${this.apiUrl}/${id}`);
  }

  createOffreImmobilier(offreImmobilier: OffreImmobilier): Observable<number> {
    return this.http.post<number>(this.apiUrl, offreImmobilier, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  updateOffreImmobilier(id: number, offreImmobilier: OffreImmobilier): Observable<number> {
    return this.http.put<number>(`${this.apiUrl}/${id}`, offreImmobilier, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  deleteOffreImmobilier(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getFilteredOffres(criteria: any): Observable<OffreImmobilier[]> {
    let params = new HttpParams();

    if (criteria.adresse) {
      params = params.set('adresse', criteria.adresse);
    }

    if (criteria.typeBien && criteria.typeBien.length > 0) {
      params = params.set('typeBien', criteria.typeBien.join(','));
    }

    if (criteria.budgetMin) {
      params = params.set('budgetMin', criteria.budgetMin.toString());
    }

    if (criteria.budgetMax) {
      params = params.set('budgetMax', criteria.budgetMax.toString());
    }

    if (criteria.chambres && criteria.chambres.length > 0) {
      params = params.set('chambres', criteria.chambres.join(','));
    }

    if (criteria.sallesDeBain && criteria.sallesDeBain.length > 0) {
      params = params.set('sallesDeBain', criteria.sallesDeBain.join(','));
    }

    if (criteria.agePropriete && criteria.agePropriete.length > 0) {
      params = params.set('agePropriete', criteria.agePropriete.join(','));
    }

    return this.http.get<OffreImmobilier[]>(`${this.apiUrl}/filter`, { params });
  }

}
