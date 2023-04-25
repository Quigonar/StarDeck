import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardsI } from 'app/models/cards.interface';
import { ApiService } from 'app/services/api.service';
import { RouteService } from 'app/services/route.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-first-login',
  templateUrl: './first-login.component.html',
  styleUrls: ['./first-login.component.scss']
})
export class FirstLoginComponent implements OnInit {
  public cardsGiven : CardsI[]
  constructor(private router:Router, private api:ApiService, private routeService:RouteService, private location: Location) { }

  choose_card() {
    this.router.navigate(['/choose-card/1'])
  }

  ngOnInit(): void {
    this.api.getFirstLoginCards().subscribe(cards => {
      this.cardsGiven = cards
      this.routeService.setCards(cards)
      this.cardsGiven = this.cardsGiven.slice(0,15)
    })
  }

}
