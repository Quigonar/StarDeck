import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardsI } from 'app/models/cards.interface';
import { AlertService } from 'app/services/alert.service';
import { ApiService } from 'app/services/api.service';
import { RouteService } from 'app/services/route.service';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { cardsPerUserI } from 'app/models/cardsPerUser.interface';

@Component({
  selector: 'app-choose-card',
  templateUrl: './choose-card.component.html',
  styleUrls: ['./choose-card.component.scss']
})
export class ChooseCardComponent implements OnInit {
  private allCards : string[]
  public cardsChoose : CardsI[]
  private cardsChosen : CardsI[]
  private cardsPerUser : cardsPerUserI
  private routeSub: Subscription
  public round : string

  constructor(private router:Router, private api:ApiService, private routeService:RouteService, private route:ActivatedRoute, private alert:AlertService, private location:Location) { }

  next_round(index) {
    if (parseInt(this.round) < 3) {
      this.router.navigate(['choose-card/', parseInt(this.round) + 1])
      this.cardsChosen.push(this.cardsChoose[index])
      console.log(this.cardsChosen)
      
      this.cardsChoose = []
    } else {
      this.cardsChosen.push(this.cardsChoose[index])
      this.cardsChosen = Array.from(new Set(this.cardsChosen))
      this.cardsChosen = this.cardsChosen.slice(0,4)
      console.log(this.cardsChosen)

      //CALL API AND ADD CHOSEN CARDS
      this.cardsChosen.forEach(card => {
        this.cardsPerUser = {
          id_carta: card.id,
          id_usuario: this.routeService.userID()
        }
        console.log(this.cardsPerUser)
        this.api.addCardToCollection(this.cardsPerUser).subscribe(answer => {

        })
      })

      //CALL API AND ALL 15 BASIC CARDS
      for (let i = 0; i<15; i++) {
        this.cardsPerUser = {
          id_carta: this.allCards[i],
          id_usuario: this.routeService.userID()
        }
        console.log(this.cardsPerUser)
        this.api.addCardToCollection(this.cardsPerUser).subscribe(answer => {

        })
      }

      let icon = "fa fa-check"
      let type = "success"
      let message = "Se ha creado su colección de cartas correctamente"
      this.alert.createAlert(icon,type,message)

      this.routeService.switch("client",this.routeService.userID())
    }
  }

  ngOnInit(): void {
    this.cardsChoose = []
    this.cardsChosen = []
    this.allCards = this.routeService.getCards()
    this.routeSub = this.route.params.subscribe(params => {
      this.round = params['round']
      if (this.round === '1') {
        this.api.getCardID(this.allCards[15]).subscribe(card => {
          this.cardsChoose.push(card)
        })
        this.api.getCardID(this.allCards[16]).subscribe(card => {
          this.cardsChoose.push(card)
        })
        this.api.getCardID(this.allCards[17]).subscribe(card => {
          this.cardsChoose.push(card)
        })
      } else if (this.round === '2') {
        this.api.getCardID(this.allCards[18]).subscribe(card => {
          this.cardsChoose.push(card)
        })
        this.api.getCardID(this.allCards[19]).subscribe(card => {
          this.cardsChoose.push(card)
        })
        this.api.getCardID(this.allCards[20]).subscribe(card => {
          this.cardsChoose.push(card)
        })
      } else {
        this.api.getCardID(this.allCards[21]).subscribe(card => {
          this.cardsChoose.push(card)
        })
        this.api.getCardID(this.allCards[22]).subscribe(card => {
          this.cardsChoose.push(card)
        })
        this.api.getCardID(this.allCards[23]).subscribe(card => {
          this.cardsChoose.push(card)
        })
      }
    })
    
    
  }

}
