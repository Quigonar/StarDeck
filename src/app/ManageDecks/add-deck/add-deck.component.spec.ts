import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { MockBuilder, MockInstance, MockRender, ngMocks } from 'ng-mocks';

import { AddDeckComponent } from './add-deck.component';
import { ApiService } from 'app/services/api.service';
import { RouteService } from 'app/services/route.service';
import { VerifyService } from 'app/services/verifier.service';

describe('AddDeckComponent', () => {
  let component: AddDeckComponent;
  let fixture: ComponentFixture<AddDeckComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockApiService: jasmine.SpyObj<ApiService>;
  let mockRouteService: jasmine.SpyObj<RouteService>;
  let mockVerifyService: jasmine.SpyObj<VerifyService>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj<Router>('Router', ['navigate']);
    mockApiService = jasmine.createSpyObj<ApiService>('ApiService', ['addDeck', 'getCollectionID']);
    mockRouteService = jasmine.createSpyObj<RouteService>('RouteService', ['userID']);
    mockVerifyService = jasmine.createSpyObj<VerifyService>('VerifyService', ['verifyDeckInfo']);

    await TestBed.configureTestingModule({
      declarations: [AddDeckComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ApiService, useValue: mockApiService },
        { provide: RouteService, useValue: mockRouteService },
        { provide: VerifyService, useValue: mockVerifyService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddDeckComponent);
    component = fixture.componentInstance;
    component.deckForm = new FormGroup({
      nombre: new FormControl('Test Deck'),
      id: new FormControl('1'),
      estado: new FormControl(true),
      id_usuario: new FormControl('123'),
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a card to the selected cards list', () => {
    const card = { id: '1', nombre: 'Card 1', energia:50, costo:50, imagen:'aaa',
  raza:'humano', tipo:'tipo 1', descripcion:'carta 1', estado: true};

    component.addCardToDeck(card);

    expect(component.selectedCards).toContain(card);
  });

  it('should remove a card from the selected cards list if already present', () => {
    const card = { id: '1', nombre: 'Card 1', energia:50, costo:50, imagen:'aaa',
  raza:'humano', tipo:'tipo 1', descripcion:'carta 1', estado: true};
    component.selectedCards = [card];

    component.addCardToDeck(card);

    expect(component.selectedCards).not.toContain(card);
  });

  it('should navigate to "/mazos" after successfully adding a deck', () => {
    const mockDeck = { id: '1', nombre: 'Test Deck', cartas: [], estado: true, id_usuario: '123' };
    mockVerifyService.verifyDeckInfo.and.returnValue(true);
    mockApiService.addDeck.and.returnValue(of("D-77"));

    component.onAdd(component.deckForm.value);

    expect(mockApiService.addDeck).toHaveBeenCalledWith(mockDeck);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/mazos']);
  });

  it('should not navigate to "/mazos" if deck info verification fails', () => {
    mockVerifyService.verifyDeckInfo.and.returnValue(false);

    component.onAdd(component.deckForm.value);

    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

});