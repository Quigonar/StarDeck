import { Injectable } from '@angular/core';
import { CardsI } from 'app/models/cards.interface';
import { localservices } from 'googleapis/build/src/apis/localservices';

@Injectable()

export class UserStorageService {
  init(user: string) {
    // !!!CHANGE TO THIS WHENEVER THERE'S FUNCTIONAL LOGIN!!!
    
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
    if (!this.exists()) throw new Error("id does not exist.");
    return localStorage.getItem("id");
  }

  getCards() {
    var cards = []
    for (let i = 0; i<24; i++) {
      cards[i] = localStorage.getItem("card" + (i + 1).toString())
    }
    /*var cards = [localStorage.getItem("card1"),localStorage.getItem("card2"),localStorage.getItem("card3"),
    localStorage.getItem("card4"),localStorage.getItem("card5"),localStorage.getItem("card6"),
    localStorage.getItem("card7"),localStorage.getItem("card8"),localStorage.getItem("card9")]*/

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
    localStorage.setItem("card1", cards[0].id)
    localStorage.setItem("card2", cards[1].id)
    localStorage.setItem("card3", cards[2].id)
    localStorage.setItem("card4", cards[3].id)
    localStorage.setItem("card5", cards[4].id)
    localStorage.setItem("card6", cards[5].id)
    localStorage.setItem("card7", cards[6].id)
    localStorage.setItem("card8", cards[7].id)
    localStorage.setItem("card9", cards[8].id)
    localStorage.setItem("card10", cards[9].id)
    localStorage.setItem("card11", cards[10].id)
    localStorage.setItem("card12", cards[11].id)
    localStorage.setItem("card13", cards[12].id)
    localStorage.setItem("card14", cards[13].id)
    localStorage.setItem("card15", cards[14].id)
    localStorage.setItem("card16", cards[15].id)
    localStorage.setItem("card17", cards[16].id)
    localStorage.setItem("card18", cards[17].id)
    localStorage.setItem("card19", cards[18].id)
    localStorage.setItem("card20", cards[19].id)
    localStorage.setItem("card21", cards[20].id)
    localStorage.setItem("card22", cards[21].id)
    localStorage.setItem("card23", cards[22].id)
    localStorage.setItem("card24", cards[23].id)
    
  }
}
