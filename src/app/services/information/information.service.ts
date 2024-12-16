import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Information} from "../../dto/model/information";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class InformationService {
  private apiUrl = `${environment.apiUrl}/informations`;

  constructor(private http: HttpClient) { }

  getAllInformations(): Observable<Information[]> {
    return this.http.get<Information[]>(this.apiUrl);
  }

  getInformation(id: number): Observable<Information> {
    return this.http.get<Information>(`${this.apiUrl}/${id}`);
  }

  createInformation(information: Information): Observable<number> {
    return this.http.post<number>(this.apiUrl, information, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  updateInformation(id: number, information: Information): Observable<number> {
    return this.http.put<number>(`${this.apiUrl}/${id}`, information, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  deleteInformation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
