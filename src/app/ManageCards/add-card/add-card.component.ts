import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CardsI } from 'app/models/cards.interface';
import { RazasI } from 'app/models/razas.interface';
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

  public razas : RazasI[]
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
    var type, message, icon
    // HACER POST POR EL API
    if (form.Nombre === '' || form.Energia === '' || form.Costo === '' || form.Imagen === '' || form.Raza === '' || form.Tipo === '' || form.Descripcion === '') {
      icon = "fa fa-exclamation-triangle"
      type = "danger"
      message = "Porfavor asegúrese de que todas las casillas esten llenas, vuelva a intentarlo."
      this.alert.createAlert(icon,type,message)
    }
    else if (form.Nombre.length > 30 || form.Nombre.length < 1) {
      icon = "fa fa-exclamation-triangle"
      type = "danger"
      message = "Porfavor asegúrese de que el usuario contenga entre 1-30 caracteres, vuelva a intentarlo."
      this.alert.createAlert(icon,type,message)
    }
    else if (form.Energia > 100 && form.Energia < -100) {
      icon = "fa fa-exclamation-triangle"
      type = "danger"
      message = "Porfavor asegúrese de que la energia se encuentre en el rango de -100 a 100, vuelva a intentarlo."
      this.alert.createAlert(icon,type,message)
    }
    else if (form.Costo > 100 && form.Costo < 0) {
      icon = "fa fa-exclamation-triangle"
      type = "danger"
      message = "Porfavor asegúrese de que el costo se encuentre en el rango de 0 a 100, vuelva a intentarlo."
      this.alert.createAlert(icon,type,message)
    }
    else if (form.Descripcion.length > 1000) {
      icon = "fa fa-exclamation-triangle"
      type = "danger"
      message = "Porfavor asegúrese de que la descripcion no contenga mas de 1000 caracteres, vuelva a intentarlo."
      this.alert.createAlert(icon,type,message)
    }
    else {
      this.card = form
      this.card.Id = ""

      this.api.addCard(this.card).subscribe(answer => {
        var icon = "fa fa-check"
        var type = "success"
        var message = "La carta ha sido creada exitosamente"
        this.alert.createAlert(icon, type, message)
        this.router.navigate(['/cartas'])
      })
    }
    
  }
  
  back(){
    this.router.navigate(['/cartas'])
  }

  ngOnInit(): void {
    this.card = {
      Nombre: '',
      Energia: 0,
      Costo: 0,
      Id: '',
      Imagen: '',
      Raza: '',
      Tipo: '',
      Descripcion: '',
      Estado: true
    }

    //Pedir del API las diferentes razas posibles y reemplazar this.razas
    this.api.getRazas().subscribe(razas => {
      this.razas = razas
    })
    this.tipos = ["Ultra-Rara", "Muy Rara", "Rara", "Normal", "Básica"]
  }

}
