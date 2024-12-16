import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {NouveauteBnaque} from "../../dto/model/nouveauteBnaque";

@Injectable({
  providedIn: 'root'
})
export class NouveauteBanqueService {

  private apiUrl = `${environment.apiUrl}/nouveauteBnaques`;  // URL de l'API

  constructor(private http: HttpClient) { }

  getAllNouveauteBnaques(): Observable<NouveauteBnaque[]> {
    return this.http.get<NouveauteBnaque[]>(this.apiUrl);
  }

  getNouveauteBnaque(id: number): Observable<NouveauteBnaque> {
    return this.http.get<NouveauteBnaque>(`${this.apiUrl}/${id}`);
  }

  createNouveauteBnaque(nouveauteBnaque: NouveauteBnaque): Observable<number> {
    return this.http.post<number>(this.apiUrl, nouveauteBnaque, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  updateNouveauteBnaque(id: number, nouveauteBnaque: NouveauteBnaque): Observable<number> {
    return this.http.put<number>(`${this.apiUrl}/${id}`, nouveauteBnaque, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  deleteNouveauteBnaque(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
