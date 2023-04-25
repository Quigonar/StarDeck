import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardsI } from 'app/models/cards.interface';
import { AlertService } from 'app/services/alert.service';
import { ApiService } from 'app/services/api.service';
import { RouteService } from 'app/services/route.service';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-choose-card',
  templateUrl: './choose-card.component.html',
  styleUrls: ['./choose-card.component.scss']
})
export class ChooseCardComponent implements OnInit {

  public cardsChoose : CardsI[]
  private routeSub: Subscription
  public round : string

  constructor(private router:Router, private api:ApiService, private routeService:RouteService, private route:ActivatedRoute, private alert:AlertService, private location:Location) { }

  next_round(index) {
    if (parseInt(this.round) < 3) {
       //decir en el api que escogio la carta this.cardsChoose[index]
      this.router.navigate(['choose-card/', parseInt(this.round) + 1])
      this.cardsChoose = []
      this.ngOnInit()
    } else {
      this.routeService.switch("client",this.routeService.userID())

      let icon = "fa fa-check"
      let type = "success"
      let message = "Se ha creado su colección de cartas correctamente"
      this.alert.createAlert(icon,type,message)
    }
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.round = params['round']
      let counter = 0
      for (let i = ((parseInt(this.round) - 1) * 3); i < ((parseInt(this.round) - 1) * 3) + 3; i++) {
        this.api.getCardID(this.routeService.getCards()[i]).subscribe(card => {
          this.cardsChoose[counter] = card[0]
          counter++
        })
      }
    })
    
    
  }

}
