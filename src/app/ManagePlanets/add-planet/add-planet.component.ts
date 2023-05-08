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
    Nombre : new FormControl(''),
    Imagen : new FormControl(''),
    Popularidad : new FormControl(''),
    Descripcion : new FormControl(''),
    Id : new FormControl(''),
    Efecto : new FormControl(''),
    Estado : new FormControl(true)
  })

  @HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {
    try {
      this.b64.getBase64(event.item(0)).then((imagen: any) => {
        this.planetForm.controls['Imagen'].setValue(imagen.base)
        this.planet.Imagen = imagen.base
      })
    } catch {
      //Do nothing
    }
  }

  constructor(private route:ActivatedRoute, private api:ApiService, private router:Router, private alert:AlertService, private b64: b64Service, private InfoVerifier:VerifyService) { 
    //Make planet preview update live
    this.planetForm.controls['Nombre'].valueChanges.subscribe((newValue) => {
      this.name_count = newValue.length
      this.planet.Nombre = newValue
    });
    this.planetForm.controls['Efecto'].valueChanges.subscribe((newValue) => {
      this.planet.Efecto = newValue
    });
    this.planetForm.controls['Popularidad'].valueChanges.subscribe((newValue) => {
      this.planet.Popularidad = newValue
    });
    this.planetForm.controls['Descripcion'].valueChanges.subscribe((newValue) => {
      this.desc_count = newValue.length
      this.planet.Descripcion = newValue
    });
    this.planetForm.controls['Estado'].valueChanges.subscribe((newValue) => {
      this.planet.Estado = newValue
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
      Nombre: '',
      Popularidad: '',
      Id: '',
      Imagen: '',
      Efecto: '',
      Descripcion: '',
      Estado: true
    }

    //Pedir del API las diferentes razas posibles y reemplazar this.razas
    this.popularidades = ["Raro", "Basico", "Popular"]
  }

}
