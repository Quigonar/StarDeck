import { EventEmitter, Injectable } from '@angular/core';
import { UserStorageService } from './user-storage.service';
import { CardsI } from 'app/models/cards.interface';
import { MatchI } from 'app/models/match.interface';
import { ParamsI } from 'app/models/parameters.interface';


@Injectable()
export class RouteService {
  public onUserChange = new EventEmitter<string>();

  constructor(private storage: UserStorageService) { 
    storage.init("login")
  }

  switch(user: string, id:string) {
    this.storage.set(user)
    this.storage.setID(id)
    this.onUserChange.emit(user)
  }

  clearMatch(){
    this.storage.clearMatchID()
  }

  clearUserID(){
    this.storage.clearUserID()
  }

  clearCards(){
    this.storage.clearCards()
  }
  
  clearTimer() {
    this.storage.clearTimer()
  }

  userID(){
    return this.storage.getID()
  }

  userLogged() {
    return this.storage.get()
  }

  matchID(){
    return this.storage.getMatchID()
  }

  getCards() {
    return this.storage.getCards()
  }

  getParams() {
    return this.storage.getParams()
  }

  getTimer(){
    return this.storage.getTimer()
  }

  setCards(cards: CardsI[]) {
    this.storage.setCards(cards)
  }

  setMatchID(match:MatchI) {
    this.storage.setMatchID(match)
  }

  setMatchID2(match_id) {
    this.storage.setMatchID2(match_id)
  }

  setParams(params:ParamsI) { 
    this.storage.setParams(params)
  }

  setTimer(timer:string) {
    this.storage.setTimer(timer)
  }
}