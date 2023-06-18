import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { MockBuilder, MockInstance, MockRender } from 'ng-mocks';

import { WinnerComponent } from './winner.component';
import { ApiService } from 'app/services/api.service';
import { RouteService } from 'app/services/route.service';
import { AlertService } from 'app/services/alert.service';
import { VerifyService } from 'app/services/verifier.service';

describe('WinnerComponent', () => {
  let component: WinnerComponent;
  let fixture: ComponentFixture<WinnerComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockApiService: jasmine.SpyObj<ApiService>;
  let mockRouteService: jasmine.SpyObj<RouteService>;
  let mockAlertService: jasmine.SpyObj<AlertService>;
  let mockVerifyService: jasmine.SpyObj<VerifyService>;

  beforeEach(async () => {

    mockRouter = jasmine.createSpyObj<Router>('Router', ['navigate']);
    mockApiService = jasmine.createSpyObj<ApiService>('ApiService', ['finishMatch', 'getGanadorPartida']);
    mockRouteService = jasmine.createSpyObj<RouteService>('RouteService', ['userID', 'matchID', 'clearMatch']);
    mockAlertService = jasmine.createSpyObj<AlertService>('AlertService', ['createAlert']);

    await TestBed.configureTestingModule({
      declarations: [WinnerComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ApiService, useValue: mockApiService },
        { provide: RouteService, useValue: mockRouteService },
        { provide: AlertService, useValue: mockAlertService },
        { provide: VerifyService, useValue: mockVerifyService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WinnerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to "/jugar" and clear match when goBackToPlayScreen is called', () => {
    mockApiService.finishMatch.and.returnValue(of({ id: '123', nombre: 'user1', username:'usern1', nacionalidad:'CR',
    contrasena:'1234', correo:'u@d', estado:true, avatar:'avatar1', ranking:3, monedas:50,
    administrador:false, actividad:'actividad1'}));

    component.goBackToPlayScreen();

    expect(mockApiService.finishMatch).toHaveBeenCalledWith(undefined);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/jugar']);
    expect(mockRouteService.clearMatch).toHaveBeenCalled();
  });


});