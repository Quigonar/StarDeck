import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { CardsI } from 'app/models/cards.interface';
import { RazasI } from 'app/models/razas.interface';
import { PlayerI } from 'app/models/player.interface';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AlertService } from './alert.service';
import { PlanetsI } from 'app/models/planets.interface';
import { DecksI } from 'app/models/decks.interface';


@Injectable({
  providedIn: 'root'
})

export class ApiService {
  url:string = "https://localhost:7085/"

  constructor(private http:HttpClient, private alert:AlertService) { }

  private makeRequest<T>(url: string, method: string, data?: any) {
    let icon = "fa fa-exclamation-triangle"
    let type = "danger"
    let message
    switch (method) {
      case 'GET':
        return this.http.get<T>(url).pipe(
          catchError((error) => {
            if (error.error instanceof ErrorEvent) {
              message = "Un error ha ocurrido: ", error.error.message
              this.alert.createAlert(icon,type,message)
            } else {
              if (error.status === 0 && error.statusText === 'Unknown Error') {
                message = "Error: no se pudo conectar con el servidor, porfavor intentelo luego"
                this.alert.createAlert(icon,type,message)
              } else {
                message = "Error: con el servidor, porfavor intentelo luego"
                this.alert.createAlert(icon,type,message)
              }
            }
            return of('Something went wrong. Please try again later.') as Observable<T>;
          })
        );
      case 'PUT':
        return this.http.put<T>(url, data).pipe(
          catchError((error) => {
            if (error.error instanceof ErrorEvent) {
              message = "Un error ha ocurrido: ", error.error.message
              this.alert.createAlert(icon,type,message)
            } else {
              if (error.status === 0 && error.statusText === 'Unknown Error') {
                message = "Error: no se pudo conectar con el servidor, porfavor intentelo luego"
                this.alert.createAlert(icon,type,message)
              } else {
                message = "Error: con el servidor, porfavor intentelo luego"
                this.alert.createAlert(icon,type,message)
              }
            }
            return of('Something went wrong. Please try again later.') as Observable<T>;
          })
        );
      case 'POST':
        return this.http.post<T>(url, data).pipe(
          catchError((error) => {
            if (error.error instanceof ErrorEvent) {
              message = "Un error ha ocurrido: ", error.error.message
              this.alert.createAlert(icon,type,message)
            } else {
              if (error.status === 0 && error.statusText === 'Unknown Error') {
                message = "Error: no se pudo conectar con el servidor, porfavor intentelo luego"
                this.alert.createAlert(icon,type,message)
              } else {
                message = "Error: con el servidor, porfavor intentelo luego"
                this.alert.createAlert(icon,type,message)
              }
            }
            return of('Something went wrong. Please try again later.') as Observable<T>;
          })
        );
      default:
        return of('Something went wrong. Please try again later.');
    }
  }
  
  //CARDS REQUESTS
  getCards():Observable<CardsI[]>{
    let dir = this.url + "carta/lista"
    return this.makeRequest<CardsI[]>(dir, 'GET') as Observable<CardsI[]>
  }
  getCardID(card:any):Observable<CardsI>{
    let dir = this.url + "carta/lista/" + card
    return this.makeRequest<CardsI>(dir, 'GET') as Observable<CardsI>
  }
  addCard(card:CardsI):Observable<string>{
    let dir = this.url + "carta/guardar"
    return this.makeRequest<string>(dir, 'POST', card)
  }
  updateCard(card:CardsI):Observable<string>{
    let dir = this.url + "carta/editar"
    return this.makeRequest<string>(dir, 'PUT', card)
  }

  //LOGIN/SIGNUP REQUESTS
  addUser(player:PlayerI):Observable<string>{
    let dir = this.url + "usuario/guardarJugador"
    return this.makeRequest<string>(dir, 'POST', player)
  }
  getFirstLoginCards():Observable<CardsI[]>{
    let dir = this.url + "carta/getnewDeck"
    return this.makeRequest<CardsI[]>(dir, 'GET') as Observable<CardsI[]>
  }

  //PLANETS REQUESTS
  getPlanets():Observable<PlanetsI[]>{
    let dir = this.url + "planetas/lista"
    return this.makeRequest<PlanetsI[]>(dir,'GET') as Observable<PlanetsI[]>
  }
  getPlanetID(planeta:any):Observable<PlanetsI>{
    let dir = this.url + "planetas/lista/" + planeta
    return this.makeRequest<PlanetsI>(dir, 'GET') as Observable<PlanetsI>
  }
  addPlanet(planet:PlanetsI):Observable<string>{
    let dir = this.url + "planetas/guardar"
    return this.makeRequest<string>(dir,'POST', planet)
  }
  updatePlanet(planet:PlanetsI):Observable<string>{
    let dir = this.url + "planet/editar"
    return this.makeRequest<string>(dir, 'PUT', planet)
  }

  //DECKS REQUESTS
  addDeck(deck:DecksI):Observable<string>{
    let dir = this.url + "decks/guardar"
    return this.makeRequest<string>(dir,'POST', deck)
  }

  //DROPDOWN TABLES REQUESTS
  getRazas():Observable<RazasI[]>{
    let dir = this.url + "carta/razas"
    return this.makeRequest<RazasI[]>(dir, 'GET') as Observable<RazasI[]>
  }
}