import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatchI } from 'app/models/match.interface';
import { PartidaI } from 'app/models/partida.interface';
import { PlayerI } from 'app/models/player.interface';
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
  private intervalId : any
  private counterInterval : any
  private partida : PartidaI

  constructor(private router:Router, private api:ApiService, private test:TestService, private user:RouteService) { }

  searchGame() {
    this.api.searchGame(this.user.userID()).subscribe(player => {
      location.reload()
    })
  }

  checkForConnection() {
    this.api.matchMakingCheck(this.user.userID()).subscribe(match => {
        if (match.id_Partida !== null) {
          if (match.id_Partida.startsWith("G-")) {
            this.user.setMatchID(match)
            console.log(this.user.matchID())
          }
        }
      
      this.api.getPartidaID(this.user.matchID()).subscribe(partida => {
        if (partida.estado === 3) {
          this.router.navigate(["/partida"])
          clearInterval(this.intervalId)
        }
      })
    })

    
  }

  reconnect(){
    this.router.navigate(["/partida"])
  }

  stopCountdown(){
    this.api.finishMatch(this.player.id).subscribe(player => {})
    clearInterval(this.counterInterval)
  }

  reload(){
    location.reload()
  }

  ngOnInit(): void {
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
        this.intervalId = setInterval(() => {
          this.checkForConnection()
        }, 3000)
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
      }
    })
  }

  ngOnDestroy() {
    clearInterval(this.intervalId); // Stop the interval when the component is destroyed
  }

}
