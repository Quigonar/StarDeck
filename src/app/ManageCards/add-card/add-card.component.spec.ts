import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { AddCardComponent } from './add-card.component';
import { ApiService } from 'app/services/api.service';
import { AlertService } from 'app/services/alert.service';
import { b64Service } from 'app/services/b64.service';
import { VerifyService } from 'app/services/verifier.service';
import { RazasI } from 'app/models/razas.interface';

describe('AddCardComponent', () => {
  let component: AddCardComponent;
  let fixture: ComponentFixture<AddCardComponent>;
  let apiServiceMock: jasmine.SpyObj<ApiService>;
  let alertServiceMock: jasmine.SpyObj<AlertService>;
  let b64ServiceMock: jasmine.SpyObj<b64Service>;
  let verifyServiceMock: jasmine.SpyObj<VerifyService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    apiServiceMock = jasmine.createSpyObj('ApiService', ['addCard', 'getRazas']);
    alertServiceMock = jasmine.createSpyObj('AlertService', ['createAlert']);
    b64ServiceMock = jasmine.createSpyObj('b64Service', ['getBase64']);
    verifyServiceMock = jasmine.createSpyObj('VerifyService', ['verifyCardInfo', 'verifyCardAnswer']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
  
    
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [AddCardComponent],
      providers: [
        { provide: ApiService, useValue: apiServiceMock },
{ provide: AlertService, useValue: alertServiceMock },
{ provide: b64Service, useValue: b64ServiceMock },
{ provide: VerifyService, useValue: verifyServiceMock },
{ provide: Router, useValue: routerMock }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCardComponent);
    apiServiceMock.getRazas.and.returnValue(of([]));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call api service to add a new card and navigate to cards page', () => {
    const form = {
      nombre: 'Card Name',
      energia: 5,
      costo: 10,
      id: '1',
      imagen: 'image-base64',
      raza: 'Raza',
      tipo: 'Tipo',
      descripcion: 'Card Description',
      estado: true,
    };
    const addCardResponse = "C-77";
    const verifyCardInfoReturnValue = true;
    const verifyCardAnswerReturnValue = true;

    verifyServiceMock.verifyCardInfo.and.returnValue(verifyCardInfoReturnValue);
    verifyServiceMock.verifyCardAnswer.and.returnValue(verifyCardAnswerReturnValue);
    apiServiceMock.addCard.and.returnValue(of(addCardResponse));
    component.onAdd(form);

    expect(verifyServiceMock.verifyCardInfo).toHaveBeenCalledWith(form);
    expect(apiServiceMock.addCard).toHaveBeenCalledWith(form);
    expect(verifyServiceMock.verifyCardAnswer).toHaveBeenCalledWith(addCardResponse);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/cartas']);
  });

  it('should navigate to cards page', () => {
    component.back();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/cartas']);
  });


});