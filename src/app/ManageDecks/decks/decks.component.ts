import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardsI } from 'app/models/cards.interface';
import { DecksI } from 'app/models/decks.interface';
import { ApiService } from 'app/services/api.service';
import { RouteService } from 'app/services/route.service';
import { TestService } from 'app/services/testing.service';

@Component({
  selector: 'app-decks',
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.scss']
})
export class DecksComponent implements OnInit {
  public decks: DecksI[]
  public cards: CardsI[]
  public searchTerm : any
  public selectedDeck: DecksI | null = null;

  
  constructor(private router:Router, private api:ApiService, private test:TestService, private user:RouteService) { }

  addDeck(){
    this.router.navigate(['/anadir-mazo'])
  }
  editDeck(id:any) {
    this.router.navigate(['/editar-mazo/',id])
  }

  toggleDeck(clickedDeck: DecksI): void {
    this.decks.forEach(deck => {
      if (deck === clickedDeck) {
        deck.estado = !deck.estado
        if (this.cards === undefined || this.cards.length === 0 || this.cards != clickedDeck.cartas) {
          this.cards = clickedDeck.cartas
          this.selectedDeck = clickedDeck
          //HACER LLAMADA DE API PARA PONER EN ACTIVO ESTE DECK
          this.api.updateDeckState(this.selectedDeck, this.selectedDeck.id).subscribe(answer => {

          })
        }
        else {
          this.selectedDeck = null
          this.cards = []
        }
      } else {
        deck.estado = false
        this.api.updateDeckState(deck, deck.id).subscribe(answer => {

        })
      }
    });
  }

  ngOnInit(): void {
    this.api.getDecks(this.user.userID()).subscribe(decks => {
      this.decks = decks
      this.decks.forEach(deck => {
        if (deck.estado === true) {
          this.selectedDeck = deck
          this.cards = deck.cartas
          console.log("CARTAS ABAJO:")
          console.log(this.cards)
        }
      });
    })
    //this.decks = this.test.testDecks(20)
  }

}