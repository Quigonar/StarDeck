import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { winnerI } from 'app/models/winner.interface';
import { AlertService } from 'app/services/alert.service';
import { ApiService } from 'app/services/api.service';
import { RouteService } from 'app/services/route.service';
import { TestService } from 'app/services/testing.service';
import { VerifyService } from 'app/services/verifier.service';

@Component({
  selector: 'app-winner',
  templateUrl: './winner.component.html',
  styleUrls: ['./winner.component.scss']
})
export class WinnerComponent implements OnInit {

  winnerInfo: winnerI
  matchEndedTied: boolean = false

  constructor(private router:Router, private api:ApiService, private test:TestService, private InfoVerifier:VerifyService, private user:RouteService, private alert:AlertService) { }

  goBackToPlayScreen() {
    this.api.finishMatch(this.user.userID(), this.user.matchID()).subscribe(answer => {
      this.router.navigate(['/jugar'])
      this.user.clearMatch()
      location.reload()
    })
  }

  ngOnInit() {
    this.winnerInfo = {
      winnerPerPlanet: null,
      winner: null,
      pointsPerPlanet: null,
      pointsRivalPerPlanet: null,
      planetsOnMatch: null,
      loser: null
    }

    this.api.getGanadorPartida(this.user.matchID(), this.user.userID()).subscribe(winnerInfo => {
      this.winnerInfo = winnerInfo
      console.log(this.winnerInfo)
      if (this.winnerInfo.winner === null && this.winnerInfo.loser === null) {
        this.matchEndedTied = true
      } else if (this.winnerInfo.winner.id === this.user.userID()) {
        let icon = "fa fa-check"
        let type = "success"
        let message = "Has ganado la partida! Felicidades!"
        this.alert.createAlert(icon, type, message)
      } else {
        let icon = "fa fa-check"
        let type = "warning"
        let message = "Has perdido la partida. Mejor suerte en la proxima!"
        this.alert.createAlert(icon, type, message)
      }
    })
  }

}
