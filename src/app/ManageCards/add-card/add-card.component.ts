import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CardsI } from 'app/models/cards.interface';
import { AlertService } from 'app/services/alert.service';
import { ApiService } from 'app/services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss']
})
export class AddCardComponent implements OnInit {

  public card: CardsI
  private routeSub: Subscription

  public razas
  public tipos

  name_count : number = 0
  desc_count : number = 0
  activo : boolean = true

  public cardForm = new FormGroup({
    Nombre : new FormControl(),
    Energia : new FormControl(),
    Costo : new FormControl(),
    ID : new FormControl(),
    Imagen : new FormControl(),
    Raza : new FormControl(),
    Tipo : new FormControl(),
    Descripcion : new FormControl(),
    Estado : new FormControl()
  })

  @HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {
    this.api.getBase64(event.item(0)).then((imagen: any) => {
      this.cardForm.controls['Imagen'].setValue(imagen.base)
      this.card.Imagen = imagen.base
    })
  }

  constructor(private route:ActivatedRoute, private api:ApiService, private router:Router, private alert:AlertService) { 
    //Make card preview update live
    this.cardForm.controls['Nombre'].valueChanges.subscribe((newValue) => {
      this.name_count = newValue.length
      this.card.Nombre = newValue
    });
    this.cardForm.controls['Energia'].valueChanges.subscribe((newValue) => {
      this.card.Energia = newValue
    });
    this.cardForm.controls['Costo'].valueChanges.subscribe((newValue) => {
      this.card.Costo = newValue
    });
    this.cardForm.controls['Raza'].valueChanges.subscribe((newValue) => {
      this.card.Raza = newValue
    });
    this.cardForm.controls['Tipo'].valueChanges.subscribe((newValue) => {
      this.card.Tipo = newValue
    });
    this.cardForm.controls['Descripcion'].valueChanges.subscribe((newValue) => {
      this.desc_count = newValue.length
      this.card.Descripcion = newValue
    });
    this.cardForm.controls['Estado'].valueChanges.subscribe((newValue) => {
      this.card.Estado = newValue
    });
  }

  onAdd(form){
    this.card = form
    console.log(this.card)
    // HACER POST POR EL API

    var icon = "fa fa-check"
    var type = "success"
    var message = "La carta ha sido creada exitosamente"
    this.alert.createAlert(icon, type, message)
    this.router.navigate(['/cartas'])
  }
  
  back(){
    this.router.navigate(['/cartas'])
  }

  ngOnInit(): void {
    this.card = {
      Nombre: '',
      Energia: 0,
      Costo: 0,
      ID: '',
      Imagen: '',
      Raza: '',
      Tipo: '',
      Descripcion: '',
      Estado: true
    }

    //Pedir del API las diferentes razas posibles y reemplazar this.razas
    this.razas = ["Raza 1", "Raza 2", "Raza 3", "Raza 4", "Raza 5"]
    this.tipos = ["Ultra-Rara", "Muy Rara", "Rara", "Normal", "Basica"]
  }

}
