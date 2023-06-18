import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { EditCardComponent } from './edit-card.component';
import { ApiService } from 'app/services/api.service';
import { b64Service } from 'app/services/b64.service';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { CardsI } from 'app/models/cards.interface';

describe('EditCardComponent', () => {
  let component: EditCardComponent;
  let fixture: ComponentFixture<EditCardComponent>;
  let apiServiceMock: Partial<ApiService>;
  let activatedRouteMock: Partial<ActivatedRoute>;
  let routerMock: Partial<Router>;

  beforeEach(async () => {
    apiServiceMock = {
      getCardID: jasmine.createSpy('getCardID').and.returnValue(of({} as CardsI))
    };

    activatedRouteMock = {
      params: of({ id: '1' })
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [EditCardComponent],
      providers: [
        { provide: ApiService, useValue: apiServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: Router, useValue: routerMock },
        b64Service
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate back to cards list', () => {
    component.back();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/cartas']);
  });

  it('should update card details', () => {
    const formValue = {
      nombre: 'Updated Name',
      energia: 10,
      costo: 20,
      imagen: 'updated-image-base64',
      raza: 'Updated Raza',
      tipo: 'Updated Tipo',
      descripcion: 'Updated Description',
      id: '1',
      estado: true
    };
    component.cardForm.setValue(formValue);
    component.onEdit(component.cardForm);
    // Add assertions for the API service call or any other expected behavior
  });
});