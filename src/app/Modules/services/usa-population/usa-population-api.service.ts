import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FetchedPopulation } from '../../interfaces/population'

@Injectable({
  providedIn: 'root'
})
export class UsaPopulationApiService {

  constructor(private http: HttpClient) {}

  getPopulation(): Observable<FetchedPopulation> {
    return this.http.get <FetchedPopulation>('https://datausa.io/api/data?drilldowns=State&measures=Population');
  }
}
