import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CardsI } from 'app/models/cards.interface';
import { RazasI } from 'app/models/razas.interface';
import { AlertService } from 'app/services/alert.service';
import { ApiService } from 'app/services/api.service';
import { b64Service } from 'app/services/b64.service';
import { VerifyService } from 'app/services/verifier.service';
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

  public name_count : number = 0
  public desc_count : number = 0
  public activo : boolean = true

  public cardForm = new FormGroup({
    nombre : new FormControl(''),
    energia : new FormControl(0),
    costo : new FormControl(0),
    imagen : new FormControl(''),
    raza : new FormControl(''),
    tipo : new FormControl(''),
    descripcion : new FormControl(''),
    id : new FormControl(''),
    estado : new FormControl(true)
  })

  @HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {
    try {
      this.b64.getBase64(event.item(0)).then((imagen: any) => {
        this.cardForm.controls['imagen'].setValue(imagen.base)
        this.card.imagen = imagen.base
      })
    } catch {
      //Do nothing
    }
  }

  constructor(private route:ActivatedRoute, private api:ApiService, private router:Router, private alert:AlertService, private b64: b64Service, private InfoVerifier:VerifyService) { 
    //Make card preview update live
    this.cardForm.controls['nombre'].valueChanges.subscribe((newValue) => {
      this.name_count = newValue.length
      this.card.nombre = newValue
    });
    this.cardForm.controls['energia'].valueChanges.subscribe((newValue) => {
      this.card.energia = newValue
    });
    this.cardForm.controls['costo'].valueChanges.subscribe((newValue) => {
      this.card.costo = newValue
    });
    this.cardForm.controls['raza'].valueChanges.subscribe((newValue) => {
      this.card.raza = newValue
    });
    this.cardForm.controls['tipo'].valueChanges.subscribe((newValue) => {
      this.card.tipo = newValue
    });
    this.cardForm.controls['descripcion'].valueChanges.subscribe((newValue) => {
      this.desc_count = newValue.length
      this.card.descripcion = newValue
    });
    this.cardForm.controls['estado'].valueChanges.subscribe((newValue) => {
      this.card.estado = newValue
    });
  }

  onAdd(form){
    if (this.InfoVerifier.verifyCardInfo(form)) {
      this.card = form

      this.api.addCard(this.card).subscribe(answer => {
        if (this.InfoVerifier.verifyCardAnswer(answer)) {
          
          this.router.navigate(['/cartas'])
        }
      })
    }
  }
  
  back(){
    this.router.navigate(['/cartas'])
  }

  ngOnInit(): void {
    this.card = {
      nombre: '',
      energia: 0,
      costo: 0,
      id: '',
      imagen: '',
      raza: '',
      tipo: '',
      descripcion: '',
      estado: true
    }

    //Pedir del API las diferentes razas posibles y reemplazar this.razas
    this.api.getRazas().subscribe(razas => {
      this.razas = razas
    })
    this.tipos = ["Ultra-Rara", "Muy Rara", "Rara", "Normal", "Básica"]
  }

}
