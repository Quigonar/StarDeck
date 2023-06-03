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
import { LoginI } from 'app/models/login.interface';
import { loginResponseI } from 'app/models/loginResponse.interface';
import { cardsPerUserI } from 'app/models/cardsPerUser.interface';
import { MatchI } from 'app/models/match.interface';
import { PartidaI } from 'app/models/partida.interface';
import { ParamsI } from 'app/models/parameters.interface';
import { TurnHandDeck } from 'app/models/turnHand.interface';
import { TurnPlanet } from 'app/models/turnPlanet.interface';
import { TurnI } from 'app/models/turn.interface';


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
      case 'DELETE':
        return this.http.delete<T>(url).pipe(
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

  //PARAMETERS REQUEST
  getParams():Observable<ParamsI>{
    let dir = this.url + "Parametros/getParametros"
    return this.makeRequest<ParamsI>(dir, 'GET') as Observable<ParamsI>
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
  login(login: LoginI):Observable<loginResponseI> {
    let dir = this.url + "login/login"
    return this.makeRequest<loginResponseI>(dir, 'POST', login) as Observable<loginResponseI>
  }
  addUser(player:PlayerI):Observable<PlayerI>{
    let dir = this.url + "usuario/guardarJugador"
    return this.makeRequest<PlayerI>(dir, 'POST', player) as Observable<PlayerI>
  }
  getPlayerID(id):Observable<PlayerI>{
    let dir = this.url + "usuario/get/" + id
    return this.makeRequest<PlayerI>(dir, 'GET') as Observable<PlayerI>
  }
  getFirstLoginCards():Observable<CardsI[]>{
    let dir = this.url + "carta/getnewDeck"
    return this.makeRequest<CardsI[]>(dir, 'GET') as Observable<CardsI[]>
  }

  //PLANETS REQUESTS
  getPlanets():Observable<PlanetsI[]>{
    let dir = this.url + "planeta/get"
    return this.makeRequest<PlanetsI[]>(dir,'GET') as Observable<PlanetsI[]>
  }
  getPlanetID(planeta:any):Observable<PlanetsI>{
    let dir = this.url + "planeta/get/" + planeta
    return this.makeRequest<PlanetsI>(dir, 'GET') as Observable<PlanetsI>
  }
  addPlanet(planet:PlanetsI):Observable<string>{
    let dir = this.url + "planeta/add"
    return this.makeRequest<string>(dir,'POST', planet)
  }
  updatePlanet(planet:PlanetsI):Observable<string>{
    let dir = this.url + "planeta/update"
    return this.makeRequest<string>(dir, 'PUT', planet)
  }

  //DECKS REQUESTS
  addDeck(deck:DecksI):Observable<string>{
    let dir = this.url + "colection/addDeck"
    return this.makeRequest<string>(dir,'POST', deck)
  }
  getDecks(user:any):Observable<DecksI[]>{
    let dir = this.url + "colection/getdecks/" + user
    return this.makeRequest<DecksI[]>(dir,'GET') as Observable<DecksI[]>
  }
  updateDeckState(deck:DecksI,id:any):Observable<string>{
    let dir = this.url + "colection/update/" + id
    return this.makeRequest<string>(dir,'PUT', deck)
  }

  //COLLECTION REQUESTS
  addCardToCollection(card:cardsPerUserI):Observable<string>{
    let dir = this.url + "colection/addCartaUsuario"
    return this.makeRequest<string>(dir, 'POST', card)
  }
  getCollectionID(user:any):Observable<CardsI[]>{
    let dir = this.url + "colection/getcolection/" + user
    return this.makeRequest<CardsI[]>(dir, 'GET') as Observable<CardsI[]>
  }

  //MATCHMAKING REQUESTS
  searchGame(user:any):Observable<PlayerI>{
    let dir = this.url + "matchmaking/searchGame/" + user
    return this.makeRequest<PlayerI>(dir, 'PUT') as Observable<PlayerI>
  }
  matchMakingCheck(user:any):Observable<MatchI>{
    let dir = this.url + "matchmaking/matchmakingCheck/" + user
    return this.makeRequest<MatchI>(dir, 'GET') as Observable<MatchI>
  }
  finishMatch(user:any):Observable<PlayerI>{
    let dir = this.url + "matchmaking/finishMatchUser/" + user
    return this.makeRequest<PlayerI>(dir, 'PUT') as Observable<PlayerI>
  }
  finishGame(match_id:any):Observable<MatchI>{
    let dir = this.url + "matchmaking/finishGame/" + match_id
    return this.makeRequest<MatchI>(dir, 'PUT') as Observable<MatchI>
  }
  getPartidaID(partida:any):Observable<PartidaI>{
    let dir = this.url + "matchmaking/getPartida/" + partida
    return this.makeRequest<PartidaI>(dir, 'GET') as Observable<PartidaI>
  }
  getPlanetasPartida(partida:any):Observable<PlanetsI[]>{
    let dir = this.url + "matchmaking/getPlanetasPartida/" + partida
    return this.makeRequest<PlanetsI[]>(dir, 'GET') as Observable<PlanetsI[]>
  }
  getRival(partida:any, user:any):Observable<PlayerI>{
    let dir = this.url + "matchmaking/getRival/" + user + "/" + partida
    return this.makeRequest<PlayerI>(dir, 'GET') as Observable<PlayerI>
  }
  isInMatch(id_usuario):Observable<PartidaI> {
    let dir = this.url + "matchmaking/isInMatch/" + id_usuario
    return this.makeRequest<PartidaI>(dir, 'GET') as Observable<PartidaI>
  }

  //TURN REQUESTS
  getManoUsuario(id_usuario, id_turno):Observable<CardsI[]>{
    let dir = this.url + "Turno/getmano/" + id_usuario + "/" + id_turno
    return this.makeRequest<CardsI[]>(dir, 'GET') as Observable<CardsI[]>
  }
  getDeckUsuario(id_usuario, id_turno):Observable<CardsI[]>{
    let dir = this.url + "Turno/getdeck/" + id_usuario + "/" + id_turno
    return this.makeRequest<CardsI[]>(dir, 'GET') as Observable<CardsI[]>
  }
  getCartasPlaneta(id_planeta,id_turno,id_usuario):Observable<CardsI[]>{
    let dir = this.url + "Turno/getcartasplaneta/" + id_planeta + "/" + id_turno + "/" + id_usuario
    return this.makeRequest<CardsI[]>(dir, 'GET') as Observable<CardsI[]>
  }
  getCartasPlanetaPartida(id_planeta,id_partida,id_usuario):Observable<CardsI[]>{
    let dir = this.url + "Turno/getcartasplanetapartida/" + id_planeta + "/" + id_partida + "/" + id_usuario
    return this.makeRequest<CardsI[]>(dir, 'GET') as Observable<CardsI[]>
  }
  addCartaMano(carta:TurnHandDeck){
    let dir = this.url + "Turno/addCartaTurnoManoUsuario/"
    return this.makeRequest(dir, 'POST', carta)
  }
  addCartaDeck(carta:TurnHandDeck){
    let dir = this.url + "Turno/addCartaTurnoDeckUsuario/"
    return this.makeRequest(dir, 'POST', carta)
  }
  addCartaPlaneta(carta:TurnPlanet){
    let dir = this.url + "Turno/addCartaTurnoPlanetaUsuario/"
    return this.makeRequest(dir, 'POST', carta)
  }
  deleteCartaMano(id_usuario,id_turno,id_carta){
    let dir = this.url + "Turno/deleteCartaMano/" + id_usuario + "/" + id_turno + "/" + id_carta
    return this.makeRequest(dir, 'DELETE')
  }
  deleteCartaDeck(id_usuario,id_turno,id_carta){
    let dir = this.url + "Turno/deleteCartaDeck/" + id_usuario + "/" + id_turno + "/" + id_carta
    return this.makeRequest(dir, 'DELETE')
  }
  deleteCartaPlaneta(id_usuario,id_turno,id_carta){
    let dir = this.url + "Turno/deleteCartaPlaneta/" + id_usuario + "/" + id_turno + "/" + id_carta
    return this.makeRequest(dir, 'DELETE')
  }
  addTurno(turno:TurnI):Observable<TurnI>{
    let dir = this.url + "Turno/addTurno"
    return this.makeRequest<TurnI>(dir, 'POST', turno) as Observable<TurnI>
  }
  getLastTurno(id_partida,id_usuario):Observable<TurnI>{
    let dir = this.url + "Turno/getLastTurno/" + id_partida + "/" + id_usuario
    return this.makeRequest<TurnI>(dir, 'GET') as Observable<TurnI>
  }
  getLastTurnoNumero(id_partida,id_usuario,numero_turno):Observable<TurnI>{
    let dir = this.url + "Turno/getLastTurnoNumero/" + id_partida + "/" + id_usuario + "/" + numero_turno
    return this.makeRequest<TurnI>(dir, 'GET') as Observable<TurnI>
  }
  getTurnoID(id_turno):Observable<TurnI>{
    let dir = this.url + "Turno/getTurno/" + id_turno
    return this.makeRequest<TurnI>(dir, 'GET') as Observable<TurnI>
  }
  updateEnergia(id_turno, id_usuario, energia):Observable<TurnI>{
    let dir = this.url + "Turno/updateEnergia/" + id_turno + "/" + id_usuario
    return this.makeRequest<TurnI>(dir, 'PUT', energia) as Observable<TurnI>
  }
  updateTurno(id_turno, turno:TurnI):Observable<TurnI>{
    let dir = this.url + "Turno/updateTurno/" + id_turno
    return this.makeRequest<TurnI>(dir, 'PUT', turno) as Observable<TurnI>
  }
  getGanadorPartida(id_planeta, id_partida, id_usuario, id_rival):Observable<PlayerI>{
    let dir = this.url + "Turno/getganadorplaneta/" + id_planeta + "/" + id_partida + "/" + id_usuario + "/" + id_rival
    return this.makeRequest<PlayerI>(dir, 'GET') as Observable<PlayerI>
  }

  //DROPDOWN TABLES REQUESTS
  getRazas():Observable<RazasI[]>{
    let dir = this.url + "carta/razas"
    return this.makeRequest<RazasI[]>(dir, 'GET') as Observable<RazasI[]>
  }
}