import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { CardsI } from 'app/models/cards.interface';
import { completeTurnI } from 'app/models/completeTurn.interface';
import { DecksI } from 'app/models/decks.interface';
import { ParamsI } from 'app/models/parameters.interface';
import { PlanetsI } from 'app/models/planets.interface';
import { PlayerI } from 'app/models/player.interface';
import { TurnI } from 'app/models/turn.interface';
import { TurnHandDeck } from 'app/models/turnHand.interface';
import { TurnPlanet } from 'app/models/turnPlanet.interface';
import { winnerI } from 'app/models/winner.interface';
import { AlertService } from 'app/services/alert.service';
import { ApiService } from 'app/services/api.service';
import { RouteService } from 'app/services/route.service';
import { TestService } from 'app/services/testing.service';
import { VerifyService } from 'app/services/verifier.service';
import { match } from 'assert';
import { clear } from 'console';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {
  public selectedCard: CardsI
  public turn: TurnI
  public opponentsTurn: TurnI

  public placedCards1: CardsI[] = []
  public placedCards2: CardsI[] = []
  public placedCards3: CardsI[] = []

  private parameters: ParamsI
  private apiCallTurnEndedInterval: any
  private turnTimerInterval: any
  private showCardsInterval: any

  public timer: number = 30

  public showOpponentsCards: boolean = false
  public turnEnded: boolean = false
  public matchEnded: boolean = false

  public completeTurn: completeTurnI
  public winnerInfo: winnerI
  

  
  constructor(private router:Router, private api:ApiService, private test:TestService, private InfoVerifier:VerifyService, private user:RouteService, private alert:AlertService) { }

  selectCard(card:CardsI){
    if (this.selectedCard === card) {
      this.selectedCard = null
    } else {
      this.selectedCard = card
    }
  }

  placeCardAux(planetNumber, placedCardsPlaneta:CardsI[]){
    placedCardsPlaneta.push(this.selectedCard)
    this.completeTurn.cartasPlanetas[planetNumber].push(this.selectedCard)
    this.completeTurn.cartasManoUsuario = this.completeTurn.cartasManoUsuario.filter(instance => instance !== this.selectedCard)
    this.completeTurn.infoPartida.energia -= this.selectedCard.energia
    this.selectedCard = null
  }

  placeCard(planet:PlanetsI, index){
    //PLACE THE CARD IN ITS RESPECTIVE PLANET
    if ((this.selectedCard !== null || this.selectedCard !== undefined) && (this.completeTurn.infoPartida.energia >= this.selectedCard.energia) && (!this.turnEnded)) {
      if (this.completeTurn.cartasPlanetas[0]?.length < 5 && planet === this.completeTurn.planetasEnPartida[0]) {
        this.placeCardAux(0,this.placedCards1)
      } else if (this.completeTurn.cartasPlanetas[1]?.length < 5 && planet === this.completeTurn.planetasEnPartida[1]) {
        this.placeCardAux(1,this.placedCards2)
      } else if (this.completeTurn.cartasPlanetas[2]?.length < 5 && planet === this.completeTurn.planetasEnPartida[2] && 
        this.completeTurn.infoPartida.numero_turno >= 5) {
          this.placeCardAux(2,this.placedCards3)
      } else if (planet === this.completeTurn.planetasEnPartida[2] && this.completeTurn.infoPartida.numero_turno < 5) {
        let icon = "fa fa-exclamation-triangle"
        let type = "danger"
        let message = "El tercer planeta se habilita hasta el turno 5"
        this.alert.createAlert(icon, type, message)
      }
    //HANDLE ERRORS
    } else if (this.completeTurn.infoPartida.energia < this.selectedCard.energia) {
      let icon = "fa fa-exclamation-triangle"
      let type = "danger"
      let message = "No tiene suficiente energia para jugar esta carta"
      this.alert.createAlert(icon, type, message)
    } else if (this.completeTurn.cartasPlanetas[0]?.length >= 5 || this.completeTurn.cartasPlanetas[0]?.length >= 5 || this.completeTurn.cartasPlanetas[0]?.length >= 5) {
      let icon = "fa fa-exclamation-triangle"
      let type = "danger"
      let message = "No se permite jugar mas de 5 cartas por ubicacion"
      this.alert.createAlert(icon, type, message)
    } else if (this.turnEnded) {
      let icon = "fa fa-exclamation-triangle"
      let type = "danger"
      let message = "Ya se termino el turno, espera al siguiente turno"
      this.alert.createAlert(icon, type, message)
    } 
  }

  removeCardAux(planetNumber, placedCardsPlaneta:CardsI[], card:CardsI) {
    placedCardsPlaneta = placedCardsPlaneta.filter(instance => {instance.id !== card.id})
    this.completeTurn.cartasPlanetas[planetNumber] = this.completeTurn.cartasPlanetas[planetNumber].filter(instance => instance.id !== card.id)
    this.completeTurn.cartasManoUsuario.push(card)
    this.completeTurn.infoPartida.energia += card.energia
  }
  removeCard(card:CardsI, index){
    //REMOVE A CARD FROM ITS RESPECTIVE PLANET
    if (index === 0 && this.placedCards1.includes(card)) {
      this.removeCardAux(0, this.placedCards1, card)
    } else if (index === 1 && this.placedCards2.includes(card)) {
      this.removeCardAux(1, this.placedCards2, card)
    } else if (index === 2 && this.placedCards3) {
      this.removeCardAux(2, this.placedCards3, card)
    } else {
      //HANDLE WHERE CARD IS FROM A PREVIOUS TURN
      let icon = "fa fa-exclamation-triangle"
      let type = "danger"
      let message = "Esta carta es de un turno anterior, no puedes devolverla a la mano"
      this.alert.createAlert(icon, type, message)
    }
  }

  endTurn() {
    this.completeTurn.infoPartida.terminado = true
    this.turnEnded = true

    if (this.completeTurn.infoPartida.numero_turno <= this.parameters.turnos_totales) {
      let lastTurn = this.completeTurn.infoPartida.numero_turno
      
      this.api.updateInfoCompletaTurno(this.user.matchID(), this.user.userID(), this.completeTurn).subscribe(updatedLastTurn => { })

      //START CHECKING IF THE OTHER USER ALSO FINISHED THE TURN EARLY
      this.apiCallTurnEndedInterval = setInterval(() => {
        this.checkForOpponentsTurn(lastTurn)
      }, 2000)

    }
  }

  checkForOpponentsTurn(lastTurn) {
    this.api.getLastTurnoNumero(this.user.matchID(), this.completeTurn.rival.id, lastTurn).subscribe(opponentsTurn => { 
      if (opponentsTurn.terminado === true || this.matchEnded) {

        //UPDATE THE TURN LAST TURN AND MAKE A NEW TURN
        this.api.crearNuevoTurnoCompleto(this.user.matchID(), this.user.userID(), this.completeTurn).subscribe(newCreatedTurn => {
          this.api.getInfoCompletaTurno(this.user.matchID(), this.user.userID()).subscribe(newCreatedTurn => {
            this.completeTurn = newCreatedTurn
            this.completeTurn.infoPartida.numero_turno -= 1

            //CLEAR THE INTERVAL SINCE WE KNOW THE RIVAL ENDED HIS TURN
            clearInterval(this.apiCallTurnEndedInterval)
            
            //SHOW OPPONENTS CARDS
            this.showOpponentsCards = true

            //SET TIMER TO 10 SECONDS IN WHICH CARDS ARE GOING TO BE SHOWN
            clearInterval(this.turnTimerInterval)
            this.timer = 10;

            this.alert.createAlert("fa fa-check", "info", "Mostrando las cartas del rival!")


            //INITIALIZE SHOWING CARDS TIMER
            this.turnTimerInterval = setInterval(() => {
              this.timer--
              if (this.timer <= 0) {
                this.stopCounterShowCards()
              }
            }, 1000);
            
            //INITIALIZE SHOWING CARDS TIMER TO GO BACK TO NORMAL
            this.showCardsInterval = setInterval(() => {
              this.showOpponentsCards = false
              this.ngOnInit()
            }, 10000)
          })
        })
      }
    })
  }

  finishMatch() {
    this.api.finishGame(this.user.matchID()).subscribe(answer => {
      clearInterval(this.showCardsInterval)
      clearInterval(this.turnTimerInterval)
      clearInterval(this.apiCallTurnEndedInterval)
      
      this.router.navigate(["/ganador"])
    })
  }

  stopCounterTurn(){
    clearInterval(this.turnTimerInterval)

    //END OPPONENT'S TURN JUST IN CASE THE OPPONENT LEFT THE GAME AND END MY TURN
    this.api.getInfoCompletaTurno(this.user.matchID(), this.completeTurn.rival.id).subscribe(completeTurn => {
      completeTurn.infoPartida.terminado = true;
      this.api.updateInfoCompletaTurno(this.user.matchID(), this.completeTurn.rival.id, this.completeTurn).subscribe(updatedLastTurn => { 
        console.log(updatedLastTurn)
        this.endTurn()
      })
    })
  }

  stopCounterShowCards(){
    clearInterval(this.turnTimerInterval)
  }

  ngOnInit(){ 
    clearInterval(this.apiCallTurnEndedInterval)
    clearInterval(this.showCardsInterval)
    clearInterval(this.turnTimerInterval)

    this.completeTurn = {
      infoPartida: null,
      cartasManoUsuario: null,
      cartasDeckUsuario: null,
      cartasManoRival: null,
      cartasDeckRival: null,
      cartasPlanetas: null,
      cartasRivalPlanetas: null,
      rival: null,
      planetasEnPartida: null
    }

    //GET PARAMETERS OF MATCH AND SET TIMER TO RUN
    this.parameters = this.user.getParams()
    this.timer = this.parameters.tiempo_turno

    this.turnTimerInterval = setInterval(() => {
      this.timer--
      if (this.timer <= 0) {
        this.stopCounterTurn()
      }
    }, 1000);

    //GET TURN INFORMATION, MATCH HAS ALREADY BEEN INITIALIZED IN MATCHMAKING PROCESS
    this.api.getInfoCompletaTurno(this.user.matchID(), this.user.userID()).subscribe(completeTurn => {
      this.completeTurn = completeTurn
      this.turnEnded = this.completeTurn.infoPartida.terminado
      if (this.completeTurn.infoPartida.numero_turno > this.parameters.turnos_totales) {
        this.finishMatch()
      } else if (this.completeTurn.infoPartida.numero_turno === 1) {
        this.alert.createAlert("fa fa-check", "info", "Suerte en la partida!")
      } else {
        this.alert.createAlert("fa fa-check", "info", "Estas en un nuevo turno!")
      }
    })
  }
}