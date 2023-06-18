import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { MockBuilder, MockInstance, MockRender, ngMocks } from 'ng-mocks';

import { MatchmakingComponent } from './matchmaking.component';
import { ApiService } from 'app/services/api.service';
import { RouteService } from 'app/services/route.service';
import { AlertService } from 'app/services/alert.service';

describe('MatchmakingComponent', () => {
  let component: MatchmakingComponent;
  let fixture: ComponentFixture<MatchmakingComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockApiService: jasmine.SpyObj<ApiService>;
  let mockRouteService: jasmine.SpyObj<RouteService>;
  let mockAlertService: jasmine.SpyObj<AlertService>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj<Router>('Router', ['navigate']);
    mockApiService = jasmine.createSpyObj<ApiService>('ApiService', [
      'getDecks',
      'searchGame',
      'matchMakingCheck',
      'getPartidaID',
      'addTurnoCompleto',
      'finishMatch',
      'getPlayerID',
      'isInMatch'
    ]);
    mockRouteService = jasmine.createSpyObj<RouteService>('RouteService', ['userID', 'matchID', 'setMatchID', 'setMatchID2']);
    mockAlertService = jasmine.createSpyObj<AlertService>('AlertService', ['createAlert']);

    await TestBed.configureTestingModule({
      declarations: [MatchmakingComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ApiService, useValue: mockApiService },
        { provide: RouteService, useValue: mockRouteService },
        { provide: AlertService, useValue: mockAlertService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MatchmakingComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search for a game and reload the page when searchGame is called', fakeAsync(() => {
    const mockDecks = [
      { id: '1', nombre:'deck1', estado: true, cartas: [], id_usuario:'123'},
      {id: '2', nombre:'deck2', estado: false, cartas: [], id_usuario:'123'},
    ];
    const mockPlayer = { id: '123', nombre: 'user1', username:'usern1', nacionalidad:'CR',
    contrasena:'1234', correo:'u@d', estado:true, avatar:'avatar1', ranking:3, monedas:50,
    administrador:false, actividad:'actividad1'};

    mockApiService.getDecks.and.returnValue(of(mockDecks));
    mockApiService.searchGame.and.returnValue(of(mockPlayer));

    component.searchGame();
    tick();

    expect(mockApiService.getDecks).toHaveBeenCalledWith('1');
    expect(location.reload).toHaveBeenCalled();
  }));

  it('should show an alert when searchGame is called without a selected deck', fakeAsync(() => {
    const mockDecks = [
      { id: '1', nombre:'deck1', estado: false, cartas: [], id_usuario:'123'},
      {id: '2', nombre:'deck2', estado: false, cartas: [], id_usuario:'123'}
    ];

    mockApiService.getDecks.and.returnValue(of(mockDecks));

    component.searchGame();
    tick();

    expect(mockApiService.getDecks).toHaveBeenCalled();
    expect(mockAlertService.createAlert).toHaveBeenCalledWith(
      'fa fa-exclamation-triangle',
      'danger',
      'Porfavor seleccione un deck primero.'
    );
  }));

  it('should navigate to "/partida" when match is ready to be joined', fakeAsync(() => {
    const mockMatch = { estado: 3, id:'123',id_Partida: 'G-123' };
    const mockPartida = { id:'G-123', estado: 3, fecha_hora:'12/08/2023'};

    mockApiService.matchMakingCheck.and.returnValue(of(mockMatch));
    mockApiService.getPartidaID.and.returnValue(of(mockPartida));

    spyOn(window, 'clearInterval');

    component.checkForConnection();
    tick();

    expect(mockApiService.matchMakingCheck).toHaveBeenCalledWith('123');
    expect(mockApiService.getPartidaID).toHaveBeenCalledWith('G-123');
    expect(mockApiService.addTurnoCompleto).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/partida']);
    expect(window.clearInterval).toHaveBeenCalledTimes(2);

  }));

  it('should reload the page when reload is called', () => {
    spyOn(window.location, 'reload');

    component.reload();

    expect(window.location.reload).toHaveBeenCalled();
  });

  it('should initialize the component and set player status to "En partida"', fakeAsync(() => {

    const mockPlayer = { id: '123', nombre:'player1' , username:'puser', nacionalidad:'CR', 
      contrasena:'1234', correo:'pl@g', estado:true, avatar:'av12', ranking:8, 
      monedas:50, administrador:true, actividad: 'En partida'};
    const mockMatch = { id:'G-123', estado: 3, fecha_hora:'12/08/2023'};

    mockApiService.getPlayerID.and.returnValue(of(mockPlayer));
    mockApiService.isInMatch.and.returnValue(of(mockMatch));
    spyOn(window, 'setInterval');

    component.ngOnInit();
    tick();

    expect(mockApiService.getPlayerID).toHaveBeenCalledWith('123');
    expect(mockApiService.isInMatch).toHaveBeenCalledWith('123');
    expect(mockRouteService.setMatchID2).toHaveBeenCalledWith('G-123');
    expect(window.setInterval).toHaveBeenCalledTimes(2);
    expect(component.inMatch).toBe(true);
    expect(component.searchingMatch).toBe(false);
    expect(component.matchNotFound).toBe(false);
  }));

  it('should destroy the component and clear intervals', () => {
    spyOn(window, 'clearInterval');

    component.ngOnDestroy();

    expect(window.clearInterval).toHaveBeenCalledTimes(2);
  });
});