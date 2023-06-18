import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CardsComponent } from './cards.component';
import { ApiService } from 'app/services/api.service';

describe('CardsComponent', () => {
  let component: CardsComponent;
  let fixture: ComponentFixture<CardsComponent>;
  let apiServiceMock: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    apiServiceMock = jasmine.createSpyObj('ApiService', ['getCards']);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CardsComponent],
      providers: [
        { provide: ApiService, useValue: apiServiceMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to add card page', () => {
    const routerSpy = spyOn(component.router, 'navigate');

    component.addCard();

    expect(routerSpy).toHaveBeenCalledWith(['/anadir_carta']);
  });

  it('should navigate to edit card page with correct ID', () => {
    const routerSpy = spyOn(component.router, 'navigate');
    const index = 0;
    const cardId = 'card-001';
    
    component.cards = [
      { id: 'card-001', nombre: 'Card 1', energia:5, costo:40, 
      imagen:"imagen1", raza: "raza 1", tipo:"tipo 1", descripcion: "carta 1", estado:true }
    ];

    component.editCard(index);

    expect(routerSpy).toHaveBeenCalledWith(['/editar_carta/', cardId]);
  });

  it('should fetch cards from the API', () => {
    const mockCards = [
      { id: 'card-001', nombre: 'Card 1', energia:5, costo:40, 
      imagen:"imagen1", raza: "raza 1", tipo:"tipo 1", descripcion: "carta 1", estado:true }
    ];

    apiServiceMock.getCards.and.returnValue(of(mockCards));

    fixture.detectChanges();

    expect(apiServiceMock.getCards).toHaveBeenCalled();
    expect(component.cards).toEqual(mockCards);
  });
});