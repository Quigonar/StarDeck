import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CardsI } from 'app/models/cards.interface';
import { DecksI } from 'app/models/decks.interface';
import { PlanetsI } from 'app/models/planets.interface';
import { ApiService } from 'app/services/api.service';
import { RouteService } from 'app/services/route.service';
import { TestService } from 'app/services/testing.service';
import { VerifyService } from 'app/services/verifier.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {
  public deck: DecksI
  public cardsLeft: CardsI[]
  public cardsLeftOponent: CardsI[]
  public hand : CardsI[]
  public handOponent : CardsI[]

  public planetsOnMatch : PlanetsI[]

  public searchTerm : any
  public selectedCard: CardsI
  public name_count : number


  
  constructor(private router:Router, private api:ApiService, private test:TestService, private InfoVerifier:VerifyService, private user:RouteService) { }

  selectCard(card:CardsI){
    if (this.selectedCard === card) {
      this.selectedCard = null
    } else {
      this.selectedCard = card
    }
  }

  getRandomNumbers() {
    let numbers: number[] = [];

    while (numbers.length < 5) {
      let randomNumber = Math.floor(Math.random() * 17); // Generate a random number between 0 and 17

      if (numbers.length === 0 || Math.abs(randomNumber - numbers[numbers.length - 1]) > 1) {
        numbers.push(randomNumber);
      }
    }
    return numbers;
  }

  ngOnInit(): void {
    this.deck = {
      id: '',
      nombre: '',
      cartas: [],
      estado: true,
      id_usuario: this.user.userID()
    }

    //LLAMAR API PARA TRAER CARTAS DEL USUARIO
    this.hand = []
    this.handOponent = []

    this.api.getDecks(this.user.userID()).subscribe(decks => {
      decks.forEach(deck => {
        if (deck.estado === true) {
          this.deck = deck
          this.cardsLeft = deck.cartas

          let randomNums = this.getRandomNumbers()
          for (let i = 0; i < 5; i++) {
            this.hand[i] = this.cardsLeft[randomNums[i]]
            this.cardsLeft = this.cardsLeft.filter(item => item !== this.cardsLeft[randomNums[i]])
          }
        }        
      });
    })
    //CREAR METODO API PARA TRAER LAS CARTAS DEL OPONENTE

    //LLAMAR API PARA TRAER LOS PLANETAS
    //this.planetsOnMatch = this.test.testPlanets(3)
    this.api.getPlanetasPartida(this.user.matchID()).subscribe(planets => {
      this.planetsOnMatch = planets
    })
  }
}
