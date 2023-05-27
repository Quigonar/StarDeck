import { EventEmitter, Injectable } from '@angular/core';
import { UserStorageService } from './user-storage.service';
import { CardsI } from 'app/models/cards.interface';
import { MatchI } from 'app/models/match.interface';


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

  setCards(cards: CardsI[]) {
    this.storage.setCards(cards)
  }

  setMatchID(match:MatchI) {
    this.storage.setMatchID(match)
  }
}