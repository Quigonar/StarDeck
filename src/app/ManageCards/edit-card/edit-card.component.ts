import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'app/services/api.service';
import { Subscription } from 'rxjs';
import { b64Service } from 'app/services/b64.service';
import { CardsI } from 'app/models/cards.interface';
import { RazasI } from 'app/models/razas.interface';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.scss']
})
export class EditCardComponent implements OnInit {
  public card: CardsI
  private routeSub: Subscription

  public razas : RazasI[]
  public tipos

  public name_count : number = 0
  public desc_count : number = 0
  public activo : boolean = true

  public cardForm = new FormGroup({
    nombre : new FormControl(),
    energia : new FormControl(),
    costo : new FormControl(),
    imagen : new FormControl(),
    raza : new FormControl(),
    tipo : new FormControl(),
    descripcion : new FormControl(),
    id : new FormControl(),
    estado : new FormControl()
  })

  @HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {
    try {
      this.b64.getBase64(event.item(0)).then((imagen: any) => {
        this.card.imagen = imagen.base
      })
    } catch {
      //Do nothing
    }
  }

  constructor(private route:ActivatedRoute, private api:ApiService, private router:Router, private b64:b64Service) { }

  onEdit(form){
    //put on api
  }

  back(){
    this.router.navigate(['/cartas'])
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.api.getCardID(params['id']).subscribe(card => {
        this.card = card
        //this.cardForm.setValue(this.card)
      })
    })

    this.tipos = ["Ultra-Rara", "Muy Rara", "Rara", "Normal", "Básica"]
  }

}
