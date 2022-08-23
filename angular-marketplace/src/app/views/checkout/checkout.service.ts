import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Film } from '../list-films/film.model';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  public baseUrl: string = 'http://localhost:3001';
  public listFilms: Film[] = [];

  constructor(private httpClient: HttpClient) {
   }
  
   getListFilms(): Observable<Film[]> {
    return this.httpClient.get<Film[]>(this.baseUrl + '/films');
   }
}
