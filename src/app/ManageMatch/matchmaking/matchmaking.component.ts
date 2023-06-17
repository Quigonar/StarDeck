import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardsI } from 'app/models/cards.interface';
import { completeTurnI } from 'app/models/completeTurn.interface';
import { DecksI } from 'app/models/decks.interface';
import { MatchI } from 'app/models/match.interface';
import { PlayerI } from 'app/models/player.interface';
import { TurnI } from 'app/models/turn.interface';
import { AlertService } from 'app/services/alert.service';
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
  private turn : TurnI
  private completeTurn : completeTurnI

  constructor(private router:Router, private api:ApiService, private test:TestService, private user:RouteService, private alert:AlertService) { }

  searchGame() {
    this.api.getDecks(this.user.userID()).subscribe(decks => {
      decks.forEach(deck => {
        if (deck.estado === true) {
          this.api.searchGame(this.user.userID()).subscribe(player => {
            location.reload()
          })
        }
      })

      this.alert.createAlert("fa fa-exclamation-triangle", "danger","Porfavor seleccione un deck primero.")
    })
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
        if (partida?.estado === matchReadyNumber) {

          //STOP COUNTERS
          clearInterval(this.apiCallInterval)
          clearInterval(this.counterInterval) 

          //CREATE NEW TURN
          this.api.addTurnoCompleto(this.user.matchID(), this.user.userID(), this.completeTurn).subscribe(completeTurn => {
            this.completeTurn = completeTurn
            console.log(this.completeTurn)
            
            //NAVIGATE TO PLAY SCREEN
            this.router.navigate(["/partida"])
          })
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
      id: "",
      id_Partida: "",
      numero_turno: 0,
      id_Usuario: this.user.userID(),
      energia: this.user.getParams().energia_Inicial,
      terminado: false
    }

    let cartas = this.test.testCards(1)
    let cartasPlanetas = [cartas]
    let planetas = this.test.testPlanets(1)
    let user = {
      id: "",
      nombre: "",
      nacionalidad: "",
      username: "",
      contrasena: "",
      correo: "",
      estado: false,
      avatar: "",
      ranking: 0,
      monedas: 0,
      administrador: false,
      actividad: "",
    } 

    this.completeTurn = {
      infoPartida: this.turn,
      cartasManoUsuario: cartas,
      cartasDeckUsuario: cartas,
      cartasManoRival: cartas,
      cartasDeckRival: cartas,
      cartasPlanetas: cartasPlanetas,
      cartasRivalPlanetas: cartasPlanetas,
      rival: user,
      planetasEnPartida: planetas
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
