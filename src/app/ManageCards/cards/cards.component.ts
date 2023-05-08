import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardsI } from 'app/models/cards.interface';
import { ApiService } from 'app/services/api.service';
import { TestService } from 'app/services/testing.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  public cards: CardsI[]
  public searchTerm : any
  
  constructor(private router:Router, private api:ApiService, private test:TestService) { }

  addCard(){
    this.router.navigate(['/anadir_carta'])
  }
  editCard(index: number) {
    this.router.navigate(['/editar_carta/', this.cards[index].Id])
  }

  ngOnInit(): void {
    /*this.api.getCards().subscribe(cards => {
      this.cards = cards
    })*/
    this.cards = this.test.testCards(40)
  }
  
}
