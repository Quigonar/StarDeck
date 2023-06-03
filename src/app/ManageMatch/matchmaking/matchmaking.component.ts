import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardsI } from 'app/models/cards.interface';
import { DecksI } from 'app/models/decks.interface';
import { MatchI } from 'app/models/match.interface';
import { PartidaI } from 'app/models/partida.interface';
import { PlayerI } from 'app/models/player.interface';
import { TurnI } from 'app/models/turn.interface';
import { TurnHandDeck } from 'app/models/turnHand.interface';
import { ApiService } from 'app/services/api.service';
import { RouteService } from 'app/services/route.service';
import { TestService } from 'app/services/testing.service';

@Component({
  selector: 'app-matchmaking',
  templateUrl: './matchmaking.component.html',
  styleUrls: ['./matchmaking.component.scss']
})
export class MatchmakingComponent implements OnInit {
  public searchingMatch : boolean = false
  public inMatch : boolean = false
  public matchNotFound : boolean = false
  public remainingTime: number = 20
  public player : PlayerI
  public match : MatchI
  private apiCallInterval : any
  private counterInterval : any
  public deck: DecksI
  public cardsLeft: CardsI[] = []
  public hand : CardsI[] = []
  public turn : TurnI
  public handDeck : TurnHandDeck

  constructor(private router:Router, private api:ApiService, private test:TestService, private user:RouteService) { }

  searchGame() {
    this.api.searchGame(this.user.userID()).subscribe(player => {
      location.reload()
    })
  }

  generateNonEqualNumbers(): number[] {
    const numbers: number[] = [];
    
    while (numbers.length < this.user.getParams().cartas_Mano_Inicial) {
      const randomNumber = Math.floor(Math.random() * 18); // Generate random number from 0 to 17
      
      if (!numbers.includes(randomNumber)) {
        numbers.push(randomNumber);
      }
    }
    
    return numbers;
  }

  shuffleArray(array: CardsI[]) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

  checkForConnection() {
    const matchReadyNumber = 3

    //CHECK IF MATCH HAS BEEN FOUND
    this.api.matchMakingCheck(this.user.userID()).subscribe(match => {
      if (match.id_Partida !== null) {
        if (match.id_Partida.startsWith("G-")) {
          this.user.setMatchID(match)
          this.turn.id_Partida = match.id_Partida
        }
      }
      //CHECK IF MATCH IS READY TO BE JOINED
      this.api.getPartidaID(this.user.matchID()).subscribe(partida => {
        if (partida.estado === matchReadyNumber) {

          //STOP COUNTERS
          clearInterval(this.apiCallInterval)
          clearInterval(this.counterInterval) 

          //CREATE TURN
          this.api.addTurno(this.turn).subscribe(answer => {
            this.turn.id = answer.id
            this.handDeck.id_Turno = answer.id
            //GET THE DECK AND CREATE HAND
            this.api.getDecks(this.user.userID()).subscribe(decks => {
              decks.forEach(deck => {
                if (deck.estado === true) {
                  this.deck = deck
                  this.cardsLeft = deck.cartas

                  console.log("---- DECK ----")
                  console.log(this.cardsLeft)
                  

                  let randomNums = this.generateNonEqualNumbers()
                  for (let i = 0; i < this.user.getParams().cartas_Mano_Inicial; i++) {
                    this.hand[i] = this.cardsLeft[randomNums[i]]
                    this.cardsLeft = this.cardsLeft.filter(item => item !== this.cardsLeft[randomNums[i]])
                  }

                  console.log("---- HAND ----")
                  console.log(this.hand)
                  console.log("---- DECK LEFT ----")
                  console.log(this.cardsLeft)
                  
                  //SHUFFLE REST OF DECK
                  this.cardsLeft = this.shuffleArray(this.cardsLeft)

                }        
              });
              //SEND API POST TO SET PLAYER'S HAND AND REST OF DECK
              var counterForHand = 0
              this.hand.forEach(card => {
                this.handDeck.id_Carta = card.id
                this.handDeck.posicion = counterForHand
                console.log(this.handDeck)
                this.api.addCartaMano(this.handDeck).subscribe(answer => {})
                counterForHand++
              })
              var counterForDeck = 0
              this.cardsLeft.forEach(card => {
                this.handDeck.id_Carta = card.id
                this.handDeck.posicion = counterForDeck
                console.log(this.handDeck)
                this.api.addCartaDeck(this.handDeck).subscribe(answer => {})
                counterForDeck++
              })
            })
          })

          //NAVIGATE TO PLAY SCREEN
          this.router.navigate(["/partida"])
        }
      })
    })
  }

  reconnect(){
    this.router.navigate(["/partida"])
  }

  stopCountdown(){
    this.api.finishMatch(this.player.id).subscribe(player => {})
    clearInterval(this.apiCallInterval)
    clearInterval(this.counterInterval)
  }

  reload(){
    location.reload()
  }

  ngOnInit(){
    this.turn = {
      id: null,
      id_Partida: "",
      numero_turno: 1,
      id_Usuario: this.user.userID(),
      energia: this.user.getParams().energia_Inicial,
      terminado: false
    }

    this.handDeck = {
      id_Carta: "",
      id_Turno: "",
      id_Usuario: this.user.userID(),
      posicion: 0
    }

    this.api.getPlayerID(this.user.userID()).subscribe(player => {
      this.player = player
      if (this.player.actividad === "No busca partida") {
        this.searchingMatch = false
        this.inMatch = false
        this.matchNotFound = false
      } else if (this.player.actividad === "Buscando partida") {
        this.searchingMatch = true
        this.inMatch = false
        this.matchNotFound = false
        this.apiCallInterval = setInterval(() => {
          this.checkForConnection()
        }, 4000)
        this.counterInterval = setInterval(() => {
          this.remainingTime--
          if (this.remainingTime <= 0) {
            this.matchNotFound = true
            this.stopCountdown()
          }
        }, 1000);
      } else if (this.player.actividad === "En partida") {
        this.inMatch = true
        this.searchingMatch = false
        this.matchNotFound = false
        this.api.isInMatch(this.user.userID()).subscribe(match => {
          this.user.setMatchID2(match.id)
        })
      }
    })
  }

  ngOnDestroy() {
    clearInterval(this.counterInterval)
    clearInterval(this.apiCallInterval) // Stop the interval when the component is destroyed
  }

}
