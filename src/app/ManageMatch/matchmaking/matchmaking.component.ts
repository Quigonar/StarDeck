import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatchI } from 'app/models/match.interface';
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
  public remainingTime: number = 30
  public player : PlayerI
  public match : MatchI
  private intervalId : any
  private counterInterval : any

  constructor(private router:Router, private api:ApiService, private test:TestService, private user:RouteService) { }

  searchGame() {
    this.api.searchGame(this.player.id).subscribe(player => {
      this.api.matchMakingCheck(this.player.id).subscribe(match => {
        this.match = match
        try {
          console.log(match)
          if (match.id_Partida.startsWith("G-") && match.estado === 2) {
            this.user.setMatchID(this.match)
            this.router.navigate(["/partida"])
          }
        } catch {
          location.reload()
        }
      })
      
    })
  }

  checkForConnection() {
    this.api.matchMakingCheck(this.player.id).subscribe(match => {
      this.match = match
      console.log(match)
      try {
        if (match.id_Partida.startsWith("G-") && match.estado === 1) {
          this.match = match
        } else if (match.id_Partida.startsWith("G-") && match.estado === 2) {
          this.user.setMatchID(this.match)
          this.router.navigate(["/partida"])
        } else if (this.match.id_Partida.startsWith("G-") && match.estado === 3) {
          this.user.setMatchID(this.match)
          this.router.navigate(["/partida"])
        }
      } catch {
        //Do Nothing
      }
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
