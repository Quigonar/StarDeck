import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanetsI } from 'app/models/planets.interface';
import { AlertService } from 'app/services/alert.service';
import { ApiService } from 'app/services/api.service';
import { b64Service } from 'app/services/b64.service';
import { VerifyService } from 'app/services/verifier.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-planet',
  templateUrl: './add-planet.component.html',
  styleUrls: ['./add-planet.component.scss']
})
export class AddPlanetComponent implements OnInit {

  public planet: PlanetsI
  private routeSub: Subscription

  public popularidades
  public efectos

  public name_count : number = 0
  public desc_count : number = 0
  public activo : boolean = true

  public planetForm = new FormGroup({
    nombre : new FormControl(''),
    imagen : new FormControl(''),
    tipo : new FormControl(''),
    descripcion : new FormControl(''),
    id : new FormControl(''),
    estado : new FormControl(true)
  })

  @HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {
    try {
      this.b64.getBase64(event.item(0)).then((imagen: any) => {
        this.planetForm.controls['imagen'].setValue(imagen.base)
        this.planet.imagen = imagen.base
      })
    } catch {
      //Do nothing
    }
  }

  constructor(private route:ActivatedRoute, private api:ApiService, private router:Router, private alert:AlertService, private b64: b64Service, private InfoVerifier:VerifyService) { 
    //Make planet preview update live
    this.planetForm.controls['nombre'].valueChanges.subscribe((newValue) => {
      this.name_count = newValue.length
      this.planet.nombre = newValue
    });
    this.planetForm.controls['tipo'].valueChanges.subscribe((newValue) => {
      this.planet.tipo = newValue
    });
    this.planetForm.controls['descripcion'].valueChanges.subscribe((newValue) => {
      this.desc_count = newValue.length
      this.planet.descripcion = newValue
    });
    this.planetForm.controls['estado'].valueChanges.subscribe((newValue) => {
      this.planet.estado = newValue
    });
  }

  onAdd(form){
    if (this.InfoVerifier.verifyPlanetInfo(form)) {
      this.planet = form

      this.api.addPlanet(this.planet).subscribe(answer => {
        if (this.InfoVerifier.verifyPlanetAnswer(answer)) {
          this.router.navigate(['/planetas'])
        }
      })
    }
  }
  
  back(){
    this.router.navigate(['/planetas'])
  }

  ngOnInit(): void {
    this.planet = {
      nombre: '',
      tipo: '',
      id: '',
      imagen: '',
      descripcion: '',
      estado: true
    }

    //Pedir del API las diferentes razas posibles y reemplazar this.razas
    this.popularidades = ["Popular", "Basico", "Raro"]
  }

}
