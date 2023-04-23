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
    //PEDIR DEL API LA LISTA DE CARTAS Y REEMPLAZAR this.cards
    this.api.getCards().subscribe(cards => {
      this.cards = cards
    })
    /*this.cards = [
      {ID : "asdf1", Nombre : "Carta 1", Costo : 10, Energia : 20, Imagen : null, Raza : "Raza 1", Tipo : "Ultra-Rara", Descripcion : "Esta carta hace tal cosa", Estado : true},
      {ID : "asdf2", Nombre : "Carta 2", Costo : 10, Energia : 20, Imagen : null, Raza : "Raza 2", Tipo : "Muy Rara", Descripcion : "Esta carta hace tal cosa", Estado : true},
      {ID : "asdf3", Nombre : "Carta 3", Costo : 10, Energia : 20, Imagen : null, Raza : "Raza 3", Tipo : "Rara", Descripcion : "Esta carta hace tal cosa", Estado : true},
      {ID : "asdf4", Nombre : "Carta 4", Costo : 10, Energia : 20, Imagen : null, Raza : "Raza 4", Tipo : "Normal", Descripcion : "Esta carta hace tal cosa", Estado : true},
      {ID : "asdf5", Nombre : "Carta 5", Costo : 10, Energia : 20, Imagen : null, Raza : "Raza 5", Tipo : "Basica", Descripcion : "Esta carta hace tal cosa", Estado : true},
      {ID : "asdf6", Nombre : "Carta 6", Costo : 10, Energia : 20, Imagen : null, Raza : "Raza 1", Tipo : "Ultra-Rara", Descripcion : "Esta carta hace tal cosa", Estado : true},
      {ID : "asdf7", Nombre : "Carta 7", Costo : 10, Energia : 20, Imagen : null, Raza : "Raza 2", Tipo : "Muy Rara", Descripcion : "Esta carta hace tal cosa", Estado : true},
      {ID : "asdf8", Nombre : "Carta 8", Costo : 10, Energia : 20, Imagen : null, Raza : "Raza 3", Tipo : "Rara", Descripcion : "Esta carta hace tal cosa", Estado : true},
      {ID : "asdf9", Nombre : "Carta 9", Costo : 10, Energia : 20, Imagen : null, Raza : "Raza 4", Tipo : "Normal", Descripcion : "Esta carta hace tal cosa", Estado : true},
      {ID : "asdf10", Nombre : "Carta 10", Costo : 10, Energia : 20, Imagen : null, Raza : "Raza 5", Tipo : "Basica", Descripcion : "Esta carta hace tal cosa", Estado : true},
      {ID : "asdf11", Nombre : "Carta 11", Costo : 10, Energia : 20, Imagen : null, Raza : "Raza 1", Tipo : "Ultra-Rara", Descripcion : "Esta carta hace tal cosa", Estado : true},
      {ID : "asdf12", Nombre : "Carta 12", Costo : 10, Energia : 20, Imagen : null, Raza : "Raza 2", Tipo : "Muy Rara", Descripcion : "Esta carta hace tal cosa", Estado : true},
      {ID : "asdf13", Nombre : "Carta 13", Costo : 10, Energia : 20, Imagen : null, Raza : "Raza 3", Tipo : "Rara", Descripcion : "Esta carta hace tal cosa", Estado : true},
      {ID : "asdf14", Nombre : "Carta 14", Costo : 10, Energia : 20, Imagen : null, Raza : "Raza 4", Tipo : "Normal", Descripcion : "Esta carta hace tal cosa", Estado : true},
    ]*/
  }
  
}
