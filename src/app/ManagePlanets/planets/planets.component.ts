import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlanetsI } from 'app/models/planets.interface';
import { ApiService } from 'app/services/api.service';
import { TestService } from 'app/services/testing.service';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss']
})
export class PlanetsComponent implements OnInit {
  public planets: PlanetsI[]
  public searchTerm : any
  
  constructor(private router:Router, private api:ApiService, private test:TestService) { }

  addPlanet(){
    this.router.navigate(['/anadir_planeta'])
  }
  editPlanet(id:any) {
    this.router.navigate(['/editar-planeta/',id])
  }

  ngOnInit(): void {
    this.api.getPlanets().subscribe(planets => {
      this.planets = planets
    })
    //this.planets = this.test.testPlanets(40)
  }

}
