import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { MockBuilder, MockInstance, MockRender, ngMocks } from 'ng-mocks';

import { DecksComponent } from './decks.component';
import { ApiService } from 'app/services/api.service';
import { RouteService } from 'app/services/route.service';

describe('DecksComponent', () => {
  let component: DecksComponent;
  let fixture: ComponentFixture<DecksComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockApiService: jasmine.SpyObj<ApiService>;
  let mockRouteService: jasmine.SpyObj<RouteService>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj<Router>('Router', ['navigate']);
    mockApiService = jasmine.createSpyObj<ApiService>('ApiService', ['getDecks', 'updateDeckState']);
    mockRouteService = jasmine.createSpyObj<RouteService>('RouteService', ['userID']);

    await TestBed.configureTestingModule({
      declarations: [DecksComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ApiService, useValue: mockApiService },
        { provide: RouteService, useValue: mockRouteService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DecksComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to "/anadir-mazo" when addDeck is called', () => {
    component.addDeck();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/anadir-mazo']);
  });

  it('should navigate to "/editar-mazo/:id" when editDeck is called with an id', () => {
    const deckId = '123';
    component.editDeck(deckId);

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/editar-mazo/', deckId]);
  });

  it('should toggle the deck state and update API state when toggleDeck is called', () => {
    const mockDeck = { id: '123', nombre:'deck1', estado: true, cartas: [], id_usuario: '4321'};
    component.decks = [mockDeck];
    mockApiService.updateDeckState.and.returnValue(of("D-777"));

    component.toggleDeck(mockDeck);

    expect(mockDeck.estado).toBe(false);
    expect(mockApiService.updateDeckState).toHaveBeenCalledWith(mockDeck, mockDeck.id);
  });

  it('should update selectedDeck and cards when toggleDeck is called with a different deck', () => {
    const mockDeck1 = { id: '123', nombre:'deck1', estado: true, cartas: [], id_usuario: '4321'};
    const mockDeck2 = { id: '1234', nombre:'deck2', estado: true, cartas: [], id_usuario: '4321'};
    component.decks = [mockDeck1, mockDeck2];
    mockApiService.updateDeckState.and.returnValue(of("D-77"));

    component.toggleDeck(mockDeck2);

    expect(component.selectedDeck).toBe(mockDeck2);
    expect(component.cards).toEqual(mockDeck2.cartas);
    expect(mockApiService.updateDeckState).toHaveBeenCalledWith(mockDeck2, mockDeck2.id);
  });



});