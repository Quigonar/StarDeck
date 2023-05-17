import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CardsI } from 'app/models/cards.interface';
import { DecksI } from 'app/models/decks.interface';
import { ApiService } from 'app/services/api.service';
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
    Nombre : new FormControl(''),
    Id : new FormControl(''),
    Estado : new FormControl(false)
  })

  
  constructor(private router:Router, private api:ApiService, private test:TestService, private InfoVerifier:VerifyService) { 
    this.deckForm.controls['Nombre'].valueChanges.subscribe((newValue) => {
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
      console.log(this.deck)
      this.api.addDeck(this.deck).subscribe(answer => {
        if (this.InfoVerifier.verifyDeckAnswer(answer)) {
          this.router.navigate(['/mazos'])
        }
      })
    }
  }

  ngOnInit(): void {
    this.deck = {
      id: '',
      nombre: '',
      cartas: [],
      estado: false
    }
    /*this.api.getCards().subscribe(cards => {
      this.cards = cards
    })*/
    this.cards = this.test.testCards(40)
  }

}
