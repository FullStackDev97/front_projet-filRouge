import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  private nominatimUrl = 'https://nominatim.openstreetmap.org/search';

  constructor(private http: HttpClient) {}

  getCoordinates(address: string): Observable<{ lat: number, lon: number }> {
    const params = new HttpParams()
      .set('q', address)
      .set('format', 'json')
      .set('limit', '1');

    return this.http.get<any[]>(this.nominatimUrl, { params }).pipe(
      map(response => {
        if (response.length > 0) {
          return {
            lat: parseFloat(response[0].lat),
            lon: parseFloat(response[0].lon)
          };
        } else {
          throw new Error(`Unable to geocode address: ${address}`);
        }
      }),
      catchError(error => {
        console.error(`Error fetching coordinates for address ${address}:`, error);
        return throwError(new Error(`Unable to geocode address: ${address}`));
      })
    );
  }
}
