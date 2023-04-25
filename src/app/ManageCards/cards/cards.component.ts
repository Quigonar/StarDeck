import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardsI } from 'app/models/cards.interface';
import { ApiService } from 'app/services/api.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  cards: CardsI[]
  searchTerm : any
  
  constructor(private router:Router, private api:ApiService) { }

  addCard(){
    this.router.navigate(['/añadir_carta'])
  }
  editCard(id:any) {
    this.router.navigate(['/editar-carta/',id])
  }

  ngOnInit(): void {
    this.api.getCards().subscribe(cards => {
      this.cards = cards
    })
  }
  
}
