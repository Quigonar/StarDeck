import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { PlanetsComponent } from './planets.component';
import { ApiService } from 'app/services/api.service';
import { PlanetsI } from 'app/models/planets.interface';

describe('PlanetsComponent', () => {
  let component: PlanetsComponent;
  let fixture: ComponentFixture<PlanetsComponent>;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlanetsComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [ApiService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetsComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);

    // Simular respuesta exitosa del servicio
    spyOn(apiService, 'getPlanets').and.returnValue(of([]));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to add planet', () => {
    const navigateSpy = spyOn(component.router, 'navigate');
    component.addPlanet();
    expect(navigateSpy).toHaveBeenCalledWith(['/anadir_planeta']);
  });

  it('should navigate to edit planet with correct id', () => {
    const id = '123';
    const navigateSpy = spyOn(component.router, 'navigate');
    component.editPlanet(id);
    expect(navigateSpy).toHaveBeenCalledWith(['/editar-planeta/', id]);
  });

});