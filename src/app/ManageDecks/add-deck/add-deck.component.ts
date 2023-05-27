import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CardsI } from 'app/models/cards.interface';
import { DecksI } from 'app/models/decks.interface';
import { ApiService } from 'app/services/api.service';
import { RouteService } from 'app/services/route.service';
import { TestService } from 'app/services/testing.service';
import { VerifyService } from 'app/services/verifier.service';

@Component({
  selector: 'app-add-deck',
  templateUrl: './add-deck.component.html',
  styleUrls: ['./add-deck.component.scss']
})
export class AddDeckComponent implements OnInit {
  public deck: DecksI
  public cards: CardsI[]
  public searchTerm : any
  public selectedCards: CardsI[] = []
  public name_count : number

  public deckForm = new FormGroup({
    nombre : new FormControl(''),
    id : new FormControl(''),
    estado : new FormControl(true),
    id_usuario : new FormControl(this.user.userID())
  })

  
  constructor(private router:Router, private api:ApiService, private test:TestService, private InfoVerifier:VerifyService, private user:RouteService) { 
    this.deckForm.controls['nombre'].valueChanges.subscribe((newValue) => {
      this.name_count = newValue.length
    })
  }

  addCardToDeck(card){
    if (this.selectedCards.includes(card) ) {
      this.selectedCards = this.selectedCards.filter(itemToKeep => itemToKeep != card)
    } else this.selectedCards.push(card)
  }

  onAdd(form){
    this.deck = form
    this.deck.cartas = this.selectedCards

    
    if (this.InfoVerifier.verifyDeckInfo(this.deck)) {
      this.api.addDeck(this.deck).subscribe(answer => {
        /*if (this.InfoVerifier.verifyDeckAnswer(answer)) {
          this.router.navigate(['/mazos'])
        }*/
        this.router.navigate(['/mazos'])
      })
    }
  }

  ngOnInit(): void {
    this.deck = {
      id: '',
      nombre: '',
      cartas: [],
      estado: true,
      id_usuario: this.user.userID()
    }
    this.api.getCollectionID(this.user.userID()).subscribe(cards => {
      this.cards = cards
    })
  }

}
