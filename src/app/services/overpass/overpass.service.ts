import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OverpassService {
  private overpassUrl = 'https://overpass-api.de/api/interpreter';

  constructor(private http: HttpClient) {}

  getNearbyPlaces(lat: number, lon: number, types: string): Observable<any> {
    const query = `
      [out:json];
      (
        node["shop"](around:1000,${lat},${lon});
        node["amenity"="pharmacy"](around:1000,${lat},${lon});
        node["amenity"="hospital"](around:1000,${lat},${lon});
        node["amenity"="metro_station"](around:1000,${lat},${lon});
      );
      out body;
      >;
      out skel qt;
    `;
    return this.http.get(this.overpassUrl, { params: { data: query } });
  }
}
