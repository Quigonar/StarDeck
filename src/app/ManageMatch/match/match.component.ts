import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { CardsI } from 'app/models/cards.interface';
import { DecksI } from 'app/models/decks.interface';
import { ParamsI } from 'app/models/parameters.interface';
import { PlanetsI } from 'app/models/planets.interface';
import { PlayerI } from 'app/models/player.interface';
import { TurnI } from 'app/models/turn.interface';
import { TurnHandDeck } from 'app/models/turnHand.interface';
import { TurnPlanet } from 'app/models/turnPlanet.interface';
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
  public deck: DecksI
  public cardsLeft: CardsI[]
  public cardsLeftOpponent: CardsI[]
  public hand : CardsI[]
  public handOpponent : CardsI[]

  public planetsOnMatch : PlanetsI[]
  public opponent : PlayerI

  public selectedCard: CardsI
  public turn: TurnI
  public opponentsTurn: TurnI
  public cartasXPlaneta: TurnPlanet[] = []

  /*private previusTurnCards1: CardsI[] = []
  private previusTurnCards2: CardsI[] = []
  private previusTurnCards3: CardsI[] = []*/

  public placedCards1: CardsI[] = []
  public placedCards2: CardsI[] = []
  public placedCards3: CardsI[] = []

  public winnerPlanet1: PlayerI
  public winnerPlanet2: PlayerI
  public winnerPlanet3: PlayerI
  private planetsWon: number = 0

  private parameters: ParamsI
  private apiCallTurnEndedInterval: any
  private turnTimerInterval: any
  private showCardsInterval: any

  public timer: number

  public showOpponentsCards: boolean = false
  public turnEnded: boolean = false
  public matchEnded: boolean = false

  public handDeck: TurnHandDeck
  

  
  constructor(private router:Router, private api:ApiService, private test:TestService, private InfoVerifier:VerifyService, private user:RouteService, private alert:AlertService) { }

  selectCard(card:CardsI){
    if (this.selectedCard === card) {
      this.selectedCard = null
    } else {
      this.selectedCard = card
    }
  }

  placeCard(planet:PlanetsI, index){
    //PLACE THE CARD IN ITS RESPECTIVE PLANET
    if ((this.selectedCard !== null || this.selectedCard !== undefined) && (this.turn.energia >= this.selectedCard.energia) && (!this.turnEnded) &&
        ((this.placedCards1.length < 5 && planet === this.planetsOnMatch[0]) || 
        (this.placedCards2.length < 5 && planet === this.planetsOnMatch[1]) || 
        (this.placedCards3.length < 5 && planet === this.planetsOnMatch[2] && this.turn.numero_turno >= 5))
      ) {
        
          this.cartasXPlaneta.push(
          {
            id_Carta: this.selectedCard.id,
            id_Planeta: planet.id,
            id_Turno: this.turn.id,
            id_Usuario: this.user.userID()
          }
      )

      const lastCardAdded = this.cartasXPlaneta.length - 1

      if (this.cartasXPlaneta[lastCardAdded].id_Planeta === this.planetsOnMatch[0].id) {
        this.placedCards1.push(this.selectedCard)
      } else if (this.cartasXPlaneta[lastCardAdded].id_Planeta === this.planetsOnMatch[1].id) {
        this.placedCards2.push(this.selectedCard)
      } else if (this.cartasXPlaneta[lastCardAdded].id_Planeta === this.planetsOnMatch[2].id) {
        this.placedCards3.push(this.selectedCard)
      }

      this.hand = this.hand.filter(instance => instance !== this.selectedCard)
      
      this.turn.energia -= this.selectedCard.energia
      this.selectedCard = null
    
    //HANDLE ERRORS
    } else if (this.turn.energia < this.selectedCard.energia) {
      let icon = "fa fa-exclamation-triangle"
      let type = "danger"
      let message = "No tiene suficiente energia para jugar esta carta"
      this.alert.createAlert(icon, type, message)
    } else if (this.placedCards1.length >= 5 || this.placedCards2.length >= 5 || this.placedCards3.length >= 5) {
      let icon = "fa fa-exclamation-triangle"
      let type = "danger"
      let message = "No se permite jugar mas de 5 cartas por ubicacion"
      this.alert.createAlert(icon, type, message)
    } else if (this.turnEnded) {
      let icon = "fa fa-exclamation-triangle"
      let type = "danger"
      let message = "Ya se termino el turno, espera al siguiente turno"
      this.alert.createAlert(icon, type, message)
    } else if (planet === this.planetsOnMatch[2] && this.turn.numero_turno < 5) {
      let icon = "fa fa-exclamation-triangle"
      let type = "danger"
      let message = "El tercer planeta se habilita hasta el turno 5"
      this.alert.createAlert(icon, type, message)
    }
  }

  removeCard(card:CardsI, index){
    //REMOVE A CARD FROM ITS RESPECTIVE PLANET
    console.log(this.cartasXPlaneta)
    let cartaXPlaneta : TurnPlanet = {
        id_Carta: card.id,
        id_Planeta: this.planetsOnMatch[index].id,
        id_Turno: this.turn.id,
        id_Usuario: this.user.userID()
      }

    console.log(cartaXPlaneta)
    

    if (index === 0 && this.cartasXPlaneta.find(item => 
      item.id_Carta === cartaXPlaneta.id_Carta && item.id_Planeta === cartaXPlaneta.id_Planeta && 
      item.id_Turno === cartaXPlaneta.id_Turno && item.id_Usuario === cartaXPlaneta.id_Usuario)) {
        this.placedCards1 = this.placedCards1.filter(instance => instance.id !== card.id)
        this.cartasXPlaneta = this.cartasXPlaneta.filter(instance => instance.id_Carta !== card.id)
        this.hand.push(card)
        this.turn.energia += card.energia
    } else if (index === 1 && this.cartasXPlaneta.find(item => 
      item.id_Carta === cartaXPlaneta.id_Carta && item.id_Planeta === cartaXPlaneta.id_Planeta && 
      item.id_Turno === cartaXPlaneta.id_Turno && item.id_Usuario === cartaXPlaneta.id_Usuario)) {
        this.placedCards2 = this.placedCards2.filter(instance => instance.id !== card.id)
        this.cartasXPlaneta = this.cartasXPlaneta.filter(instance => instance.id_Carta !== card.id)
        this.hand.push(card)
        this.turn.energia += card.energia
    } else if (index === 2 && this.cartasXPlaneta.find(item => 
      item.id_Carta === cartaXPlaneta.id_Carta && item.id_Planeta === cartaXPlaneta.id_Planeta && 
      item.id_Turno === cartaXPlaneta.id_Turno && item.id_Usuario === cartaXPlaneta.id_Usuario)) {
        this.placedCards3 = this.placedCards3.filter(instance => instance.id !== card.id)
        this.cartasXPlaneta = this.cartasXPlaneta.filter(instance => instance.id_Carta !== card.id)
        this.hand.push(card)
        this.turn.energia += card.energia
    } else {
      let icon = "fa fa-exclamation-triangle"
      let type = "danger"
      let message = "Esta carta es de un turno anterior, no puedes devolverla a la mano"
      this.alert.createAlert(icon, type, message)
    }
  }

  endTurn() {
    this.turn.terminado = true
    this.turnEnded = true

    if (this.turn.numero_turno <= this.parameters.turnos_totales) {
      //ADD EACH CARD PLACED TO THE PLANET IN API AND ALSO REMOVE SAID CARD FROM HAND IN THE API ALSO
      this.cartasXPlaneta.forEach(cartaXPlaneta => {
        this.api.addCartaPlaneta(cartaXPlaneta).subscribe(answer => {})
        this.api.deleteCartaMano(this.user.userID(),this.turn.id,cartaXPlaneta.id_Carta).subscribe(answer => {})
      })

      //UPDATE THE TURN'S STATE TO FINALIZED SO THAT THE OTHER USER CAN FIND IT
      this.api.updateTurno(this.turn.id, this.turn).subscribe(answer => { })

      //START CHECKING IF THE OTHER USER ALSO FINISHED THE TURN EARLY
      this.apiCallTurnEndedInterval = setInterval(() => {
        this.checkForOpponentsTurn()
      }, 2000)

    }
  }

  checkForOpponentsTurn() {
    this.api.getLastTurnoNumero(this.user.matchID(), this.opponent.id,this.turn.numero_turno).subscribe(opponentsTurn => { 
      if (opponentsTurn.terminado === true || this.matchEnded) {
        
        //CLEAR THE INTERVAL SINCE WE KNOW THE RIVAL ENDED HIS TURN
        clearInterval(this.apiCallTurnEndedInterval)
        
        //SHOW OPPONENTS CARDS
        this.showOpponentsCards = true

        //GET OPONENTS CARDS AND ADD IT TO EACH OF THE PLANETS LIST
        this.alert.createAlert("fa fa-check", "success", "Mostrando las cartas del rival")

        this.planetsOnMatch.forEach(planet => {
          this.api.getCartasPlanetaPartida(planet.id,this.user.matchID(),this.opponent.id).subscribe(cards => {
            if (this.planetsOnMatch[0].id == planet.id) {
              this.placedCards1 = cards
            } else if (this.planetsOnMatch[1].id == planet.id) {
              this.placedCards2 = cards
            } else if (this.planetsOnMatch[2].id == planet.id) {
              this.placedCards3 = cards
            }
          })
        })
        
        this.showCardsInterval = setInterval(() => {
          this.createNewTurn()
        }, 10000)
      }
    })
  }

  createNewTurn(){
    //CLEAR INTERVAL SO IT DOESN'T CREATE MORE TURNS UNTIL IT HAS TO BE DONE
    clearInterval(this.showCardsInterval)

    //SET TIMER TO TIMERS PARAMETER VALUE
    this.user.setTimer(this.parameters.tiempo_turno.toString())

    //IF MATCH HAS ENDED THEN GO BACK TO PLAY SCREEN
    if (this.matchEnded){
      this.finishMatch()
    } else {
      this.alert.createAlert("fa fa-check", "success", "Estas en un nuevo turno!")
    }

    //PLACE CARDS PER PLANET OF THE USER AGAIN
    this.planetsOnMatch.forEach(planet => {
      this.api.getCartasPlanetaPartida(planet.id,this.user.matchID(),this.user.userID()).subscribe(cards => {
        if (this.planetsOnMatch[0].id == planet.id) {
          this.placedCards1 = cards
        } else if (this.planetsOnMatch[1].id == planet.id) {
          this.placedCards2 = cards
        } else if (this.planetsOnMatch[2].id == planet.id) {
          this.placedCards3 = cards
        }
      })
    })
    
    //ADD A NEW TURN AND RECALL NGONINIT TO RESTART TURN PROCESSING
    const turn_num = this.turn.numero_turno
    const energy_left = this.turn.energia
    const last_turn = this.turn.id
    const addedEnergyPerTurn = 20

    this.turn = {
      id: "",
      id_Partida: this.user.matchID(),
      numero_turno: turn_num + 1,
      id_Usuario: this.user.userID(),
      energia: energy_left + addedEnergyPerTurn,
      terminado: false
    }
    this.api.addTurno(this.turn).subscribe(answer => {
      this.turn.id = answer.id
      this.handDeck.id_Turno = answer.id

      //RETREIVE FIRST CARD FROM DECK AND PUSH IT INTO HAND
      this.hand.push(this.cardsLeft[0])

      //DELETE THE CARD FROM THE DECK IN API
      this.api.deleteCartaDeck(this.user.userID(),last_turn, this.cardsLeft[0].id).subscribe(answer => {})
      //REMOVE FIRST ELEMENT IN THE DECK FOR NEXT TURN
      this.cardsLeft.shift()
      
      //SEND API POST TO SET PLAYER'S HAND AND REST OF DECK
      var counterForHand = 0
      this.hand.forEach(card => {
        this.handDeck.id_Carta = card.id
        this.handDeck.posicion = counterForHand
        this.api.addCartaMano(this.handDeck).subscribe(answer => {})
        counterForHand++
      })
      var counterForDeck = 0
      this.cardsLeft.forEach(card => {
        this.handDeck.id_Carta = card.id
        this.handDeck.posicion = counterForDeck
        this.api.addCartaDeck(this.handDeck).subscribe(answer => {})
        counterForDeck++
      })
      
      this.turnEnded = false
      this.showOpponentsCards = false

      //RESTART PROCESSING
      this.ngOnInit()
    })
  }

  finishMatch() {
    clearInterval(this.showCardsInterval)
    clearInterval(this.turnTimerInterval)
    clearInterval(this.apiCallTurnEndedInterval)

    this.api.finishMatch(this.user.userID()).subscribe(answer => {
      this.api.finishGame(this.user.matchID()).subscribe(answer => {
        this.router.navigate(["/jugar"])
        this.user.clearMatch()
        this.user.clearTimer()
      })
    })
  }

  stopCountdown(){
    //clearInterval(this.apiCallTurnEndedInterval)
    clearInterval(this.turnTimerInterval)

    //ALSO END OPPONENT'S TURN JUST IN CASE THE OPPONENT LEFT THE GAME
    //this.opponentsTurn.terminado = true
    //this.api.updateTurno(this.opponentsTurn.id, this.opponentsTurn).subscribe(answer => { })
    //this.endTurn()
  }

  ngOnInit(){ 
    this.cartasXPlaneta = []

    this.handDeck = {
      id_Carta: "",
      id_Turno: "",
      id_Usuario: this.user.userID(),
      posicion: 0
    }

    this.winnerPlanet1 = {
      id: "",
      nombre: "",
      username: "",
      nacionalidad: "",
      contrasena: "",
      correo: "",
      estado: false,
      avatar: "",
      ranking: 0,
      monedas: 0,
      administrador: false,
      actividad: ""
    }
    this.winnerPlanet2 = {
      id: "",
      nombre: "",
      username: "",
      nacionalidad: "",
      contrasena: "",
      correo: "",
      estado: false,
      avatar: "",
      ranking: 0,
      monedas: 0,
      administrador: false,
      actividad: ""
    }
    this.winnerPlanet3 = {
      id: "",
      nombre: "",
      username: "",
      nacionalidad: "",
      contrasena: "",
      correo: "",
      estado: false,
      avatar: "",
      ranking: 0,
      monedas: 0,
      administrador: false,
      actividad: ""
    }

    //GET PARAMETERS OF MATCH AND SET TIMER TO RUN
    this.parameters = this.user.getParams()
    this.timer = this.user.getTimer()

    this.turnTimerInterval = setInterval(() => {
      this.timer--
      if (this.timer <= 0) {
        this.stopCountdown()
      }
      this.user.setTimer(this.timer.toString())
    }, 1000);

    //GET TURN INFORMATION, MATCH HAS ALREADY BEEN INITIALIZED IN MATCHMAKING PROCESS
    this.api.getLastTurno(this.user.matchID(), this.user.userID()).subscribe(answer => {
      this.turn = answer
      if (this.turn.numero_turno === 1) {
        this.timer = this.parameters.tiempo_turno
      }
      //GET OPPONENTS INFORMATION
      this.api.getRival(this.user.matchID(), this.user.userID()).subscribe(opponent => {
        this.opponent = opponent
        //CALL API TO GET HAND AND DECKS OF USER AND OPPONENT RESPECTIVELY
        this.hand = []
        this.handOpponent = []
        this.cardsLeft = []
        this.cardsLeftOpponent = []

        this.api.getManoUsuario(this.user.userID(), this.turn.id).subscribe(hand => {
          this.hand = hand
          this.api.getDeckUsuario(this.user.userID(), this.turn.id).subscribe(cardsLeft => {
            this.cardsLeft = cardsLeft
            this.api.getLastTurno(this.user.matchID(), this.opponent.id).subscribe(opponentsTurn => {
              this.opponentsTurn = opponentsTurn
              this.api.getManoUsuario(this.opponent.id, opponentsTurn.id).subscribe(handOpponent => {
                this.handOpponent = handOpponent
                this.api.getDeckUsuario(this.opponent.id, opponentsTurn.id).subscribe(cardsLeftOpponent => {
                  this.cardsLeftOpponent = cardsLeftOpponent
  
                  //CALL API TO GET THE PLANETS ASSIGNED TO THE MATCH
                  this.api.getPlanetasPartida(this.user.matchID()).subscribe(planets => {
                    this.planetsOnMatch = planets
                    //GET CARDS PLACED PER PLANET
                    this.planetsOnMatch.forEach(planet => {
                      this.api.getCartasPlanetaPartida(planet.id,this.user.matchID(),this.user.userID()).subscribe(cards => {
                        if (this.planetsOnMatch[0].id == planet.id) {
                          this.placedCards1 = cards
                        } else if (this.planetsOnMatch[1].id == planet.id) {
                          this.placedCards2 = cards
                        } else if (this.planetsOnMatch[2].id == planet.id) {
                          this.placedCards3 = cards
                        }
                      })
                    })
                    if (this.turn.numero_turno > this.parameters.turnos_totales) {
                      this.matchEnded = true
                      //GET WINNER PER PLANET OF BETWEEN BOTH USERS
                      this.planetsOnMatch.forEach(planet => {
                        this.api.getGanadorPartida(planet.id, this.user.matchID(), this.user.userID(), this.opponent.id).subscribe(winnerPerPlanet => {
                          if (winnerPerPlanet !== null) {
                            if (this.planetsOnMatch[0].id == planet.id) {
                              this.winnerPlanet1 = winnerPerPlanet
                              if (this.winnerPlanet1.id == this.user.userID()) {
                                this.planetsWon += 1
                              }
                            } else if (this.planetsOnMatch[1].id == planet.id) {
                              this.winnerPlanet2 = winnerPerPlanet
                              if (this.winnerPlanet1.id == this.user.userID()) {
                                this.planetsWon += 1
                              }
                            } else if (this.planetsOnMatch[2].id == planet.id) {
                              this.winnerPlanet3 = winnerPerPlanet
                              if (this.winnerPlanet1.id == this.user.userID()) {
                                this.planetsWon += 1
                              }
                            }
                          } else {
                            if (this.planetsOnMatch[0].id == planet.id) {
                              this.winnerPlanet1.username = "Empate"
                            } else if (this.planetsOnMatch[1].id == planet.id) {
                              this.winnerPlanet2.username = "Empate"
                            } else if (this.planetsOnMatch[2].id == planet.id) {
                              this.winnerPlanet3.username = "Empate"
                            }
                          }
                        })
                      })
                      //NOTIFY USER IF HE WON OR LOST OR TIED
                      if (this.planetsWon >= 2) {
                        this.alert.createAlert("fa fa-check", "success", "Has ganado la partida, felicidades!")
                      } else if (this.planetsWon < 2) {
                        this.alert.createAlert("fa fa-exclamation-triangle", "danger", "Has empatado o perdido la partida, intentalo de nuevo!")
                      }
                      //SHOW CARDS OPPONENTS CARDS FOR 10 SECS AND THEN GO BACK TO HOME SCREEN
                      this.checkForOpponentsTurn()
              
                    }
                  })
                })
              })
            })
          })
        })
      })
    })
  }
}
