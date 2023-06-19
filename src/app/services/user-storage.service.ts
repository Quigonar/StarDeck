import { Injectable } from '@angular/core';
import { CardsI } from 'app/models/cards.interface';
import { MatchI } from 'app/models/match.interface';
import { ParamsI } from 'app/models/parameters.interface';
import { localservices } from 'googleapis/build/src/apis/localservices';

@Injectable()

export class UserStorageService {
  init(user: string) {
    // !!!CHANGE TO THIS WHENEVER THERE'S FUNCTIONAL LOGIN!!!
    console.log(localStorage)
    if (!this.exists()) {
      localStorage.setItem("user", user);
    }
  }

  exists() {
    return localStorage.getItem("user") !== null;
  }

  get() {
    if (!this.exists()) throw new Error("user does not exist.");
    return localStorage.getItem("user");
  }

  getID() {
    return localStorage.getItem("id");
  }

  getCards() {
    var cards = []
    for (let i = 0; i<24; i++) {
      cards[i] = localStorage.getItem("card" + (i + 1).toString())
    }

    return cards
  }

  getMatchID() {
    return localStorage.getItem("matchID")
  }

  getParams() {
    let parameters: ParamsI
    parameters = {
      tiempo_turno: parseInt(localStorage.getItem("tiempo_turno")),
      turnos_totales: parseInt(localStorage.getItem("turnos_totales")),
      cartas_Mano_Inicial: parseInt(localStorage.getItem("cartas_Mano_Inicial")),
      energia_Inicial: parseInt(localStorage.getItem("energia_Inicial"))
    }

    return parameters
  }

  getTimer() {
    return parseInt(localStorage.getItem("timer"))
  }

  set(user: string) {
    if (!this.exists()) throw new Error("user does not exist.");
    localStorage.setItem("user", user);
  }

  setID(id: string) {
    if (!this.exists()) throw new Error("id does not exist.");
    localStorage.setItem("id", id);
  }

  clearUserID(){
    localStorage.removeItem("id")
  }

  setCards(cards: CardsI[]) {
    for (let i = 0; i<24; i++) {
      localStorage.setItem("card" + (i + 1).toString(), cards[i].id)
    }
  }

  clearCards(){
    for (let i = 0; i<24; i++) {
      localStorage.removeItem("card" + (i + 1).toString())
    }
  }

  setMatchID(match:MatchI) {
    localStorage.setItem("matchID", match.id_Partida)
  }

  setMatchID2(match_id) {
    localStorage.setItem("matchID", match_id)
  }

  clearMatchID() {
    localStorage.removeItem("matchID")
  }

  setParams(params:ParamsI) {
    localStorage.setItem("tiempo_turno", params[0].tiempo_turno.toString())
    localStorage.setItem("turnos_totales", params[0].turnos_totales.toString())
    localStorage.setItem("cartas_Mano_Inicial", params[0].cartas_Mano_Inicial.toString())
    localStorage.setItem("energia_Inicial", params[0].energia_Inicial.toString())
  }

  setTimer(timer:string){
    localStorage.setItem("timer", timer)
  }

  clearTimer() {
    localStorage.removeItem("timer")
  }
}
