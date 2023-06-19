import { TestBed, ComponentFixture } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { RouteService } from '../services/route.service';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { VerifyService } from '../services/verifier.service';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let apiServiceMock: any;
  let routeServiceMock: any;
  let routerMock: any;
  let alertServiceMock: any;
  let verifyServiceMock: any;

  beforeEach(async () => {
    apiServiceMock = {
      getParams: () => of({}),
      login: () => of({ found: true, usuario: { administrador: true, id: 1 } }),
      addUser: () => of({ id: 1 }),
    };

    routeServiceMock = {
      setParams: jasmine.createSpy('setParams'),
      switch: jasmine.createSpy('switch'),
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };

    alertServiceMock = {
      createAlert: jasmine.createSpy('createAlert'),
    };

    verifyServiceMock = {
      verifyUserInfo: () => true,
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [LoginComponent],
      providers: [
        { provide: ApiService, useValue: apiServiceMock },
        { provide: RouteService, useValue: routeServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: AlertService, useValue: alertServiceMock },
        { provide: VerifyService, useValue: verifyServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should switch to sign up mode', () => {
    component.signUp();
    expect(component.create_account).toBe(true);
  });

  it('should call forgotPassword', () => {
    spyOn(console, 'log');
    component.forgotPassword();
    expect(console.log).toHaveBeenCalledWith('Forgot Password');
  });

  it('should call api service to perform login as admin', () => {
    const form = {
      correo: 'test@example.com',
      contrasena: 'password',
    };
    spyOn(apiServiceMock, 'login').and.callThrough();
    component.onLogin(form);
    expect(apiServiceMock.login).toHaveBeenCalledWith(form);
    expect(routeServiceMock.switch).toHaveBeenCalledWith('admin', 1);
  });

  it('should call api service to perform login as client', () => {
    const form = {
      correo: 'test@example.com',
      contrasena: 'password',
    };
    apiServiceMock.login = () => of({ found: true, usuario: { administrador: false, id: 2 } });
    spyOn(apiServiceMock, 'login').and.callThrough();
    component.onLogin(form);
    expect(apiServiceMock.login).toHaveBeenCalledWith(form);
    expect(routeServiceMock.switch).toHaveBeenCalledWith('client', 2);
  });

  it('should show alert when login credentials are incorrect', () => {
    const form = {
      correo: 'test@example.com',
      contrasena: 'password',
    };
    apiServiceMock.login = () => of({ found: false });
    spyOn(apiServiceMock, 'login').and.callThrough();
    component.onLogin(form);
    expect(apiServiceMock.login).toHaveBeenCalledWith(form);
    expect(alertServiceMock.createAlert).toHaveBeenCalledWith(
      'fa fa-exclamation-triangle',
      'danger',
      'Los credenciales estan erroneos!'
    );
  });

  
});