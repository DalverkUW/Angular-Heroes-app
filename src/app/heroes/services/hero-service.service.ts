import { Observable, catchError, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private baseURL = environment.baseURL

  constructor(private httpClient: HttpClient) { }

  //recibir todos los héroes
  getHeroes(): Observable<Heroe[]>{
    return this.httpClient.get<Heroe[]>(`${this.baseURL}/heroes`);
  }

  //Obtener un solo héroe por id
  getHeroById(id: string): Observable<Heroe | undefined>{
    return this.httpClient.get<Heroe>(`${this.baseURL}/heroes/${id}`)
    .pipe(
      catchError(error => of(undefined) )
    )
  }

  //Obtener 6 héroes que usaremos para las sugerencias de búsqueda
  getSuggestions( query:string ):Observable<Heroe[]>{
    return this.httpClient.get<Heroe[]>(`${this.baseURL}/heroes?q=${ query }&limit=6`);
  }
  
  // getHeroById(id: string){
  //   return this.httpClient.get(`${this.baseURL}/heroes/${id}`)
  //   .pipe(
  //   catchError(error => of(undefined) )
  //   )
  // }
  
  //Para añadir un nuevo héroe a la db
  addHero(hero: Heroe):Observable<Heroe>{
    return this.httpClient.post<Heroe>(`${this.baseURL}/heroes`, hero);
  }

  UpdateHero(hero: Heroe):Observable<Heroe>{
    if (!hero.id) throw Error("Hero id is required");    

    return this.httpClient.patch<Heroe>(`${this.baseURL}/heroes/${hero.id}`, hero);
  }

  DeleteHero(id: string):Observable<boolean>{          
    return this.httpClient.delete(`${this.baseURL}/heroes/${id}`)
    .pipe(
      map(resp => true),
      catchError(e => of(false))
    );
  }

}
