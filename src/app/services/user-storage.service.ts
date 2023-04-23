import { Injectable } from '@angular/core';
import { CardsI } from 'app/models/cards.interface';

@Injectable()

export class UserStorageService {
  init(user: string) {
    // !!!CHANGE TO THIS WHENEVER THERE'S FUNCTIONAL LOGIN!!!
    
    if (!this.exists()) {
      localStorage.setItem("user", user);
      console.log("localStorage: " + localStorage.getItem("user"))
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
    if (!this.exists()) throw new Error("id does not exist.");
    return localStorage.getItem("id");
  }

  getCards() {
    var cards = [localStorage.getItem("card1"),localStorage.getItem("card2"),localStorage.getItem("card3"),
    localStorage.getItem("card4"),localStorage.getItem("card5"),localStorage.getItem("card6"),
    localStorage.getItem("card7"),localStorage.getItem("card8"),localStorage.getItem("card9")]

    return cards
  }

  set(user: string) {
    if (!this.exists()) throw new Error("user does not exist.");
    localStorage.setItem("user", user);
  }

  setID(id: string) {
    if (!this.exists()) throw new Error("id does not exist.");
    localStorage.setItem("id", id);
  }

  setCards(cards: CardsI[]) {
    localStorage.setItem("card1", cards[15].ID)
    localStorage.setItem("card2", cards[16].ID)
    localStorage.setItem("card3", cards[17].ID)
    localStorage.setItem("card4", cards[18].ID)
    localStorage.setItem("card5", cards[19].ID)
    localStorage.setItem("card6", cards[20].ID)
    localStorage.setItem("card7", cards[21].ID)
    localStorage.setItem("card8", cards[22].ID)
    localStorage.setItem("card9", cards[23].ID)
  }
}
