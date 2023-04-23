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
    console.log("here")
    this.router.navigate(['/choose-card/1'])
  }

  ngOnInit(): void {
    this.cardsGiven = [
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
      {ID : "asdf15", Nombre : "Carta 15", Costo : 10, Energia : 20, Imagen : null, Raza : "Raza 5", Tipo : "Basica", Descripcion : "Esta carta hace tal cosa", Estado : true},
      {ID : "asdf16", Nombre : "Carta 16", Costo : 10, Energia : 20, Imagen : null, Raza : "Raza 5", Tipo : "Basica", Descripcion : "Esta carta hace tal cosa", Estado : true},
      {ID : "asdf17", Nombre : "Carta 17", Costo : 10, Energia : 20, Imagen : null, Raza : "Raza 1", Tipo : "Ultra-Rara", Descripcion : "Esta carta hace tal cosa", Estado : true},
      {ID : "asdf18", Nombre : "Carta 18", Costo : 10, Energia : 20, Imagen : null, Raza : "Raza 2", Tipo : "Muy Rara", Descripcion : "Esta carta hace tal cosa", Estado : true},
      {ID : "asdf19", Nombre : "Carta 19", Costo : 10, Energia : 20, Imagen : null, Raza : "Raza 3", Tipo : "Rara", Descripcion : "Esta carta hace tal cosa", Estado : true},
      {ID : "asdf20", Nombre : "Carta 20", Costo : 10, Energia : 20, Imagen : null, Raza : "Raza 4", Tipo : "Normal", Descripcion : "Esta carta hace tal cosa", Estado : true},
      {ID : "asdf21", Nombre : "Carta 21", Costo : 10, Energia : 20, Imagen : null, Raza : "Raza 5", Tipo : "Basica", Descripcion : "Esta carta hace tal cosa", Estado : true},
      {ID : "asdf22", Nombre : "Carta 22", Costo : 10, Energia : 20, Imagen : null, Raza : "Raza 3", Tipo : "Rara", Descripcion : "Esta carta hace tal cosa", Estado : true},
      {ID : "asdf23", Nombre : "Carta 23", Costo : 10, Energia : 20, Imagen : null, Raza : "Raza 4", Tipo : "Normal", Descripcion : "Esta carta hace tal cosa", Estado : true},
      {ID : "asdf24", Nombre : "Carta 24", Costo : 10, Energia : 20, Imagen : null, Raza : "Raza 5", Tipo : "Basica", Descripcion : "Esta carta hace tal cosa", Estado : true}
    ]
    this.routeService.setCards(this.cardsGiven)
    this.cardsGiven = this.cardsGiven.slice(0,15)
  }

}
