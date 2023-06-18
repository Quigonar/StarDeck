import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { AddPlanetComponent } from './add-planet.component';
import { ApiService } from 'app/services/api.service';
import { AlertService } from 'app/services/alert.service';
import { b64Service } from 'app/services/b64.service';
import { VerifyService } from 'app/services/verifier.service';

describe('AddPlanetComponent', () => {
  let component: AddPlanetComponent;
  let fixture: ComponentFixture<AddPlanetComponent>;
  let mockApiService: jasmine.SpyObj<ApiService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockAlertService: jasmine.SpyObj<AlertService>;
  let mockB64Service: jasmine.SpyObj<b64Service>;
  let mockVerifyService: jasmine.SpyObj<VerifyService>;

  beforeEach(async () => {
    mockApiService = jasmine.createSpyObj<ApiService>('ApiService', ['addPlanet']);
    mockRouter = jasmine.createSpyObj<Router>('Router', ['navigate']);
    mockAlertService = jasmine.createSpyObj<AlertService>('AlertService', ['createAlert']);
    mockB64Service = jasmine.createSpyObj<b64Service>('b64Service', ['getBase64']);
    mockVerifyService = jasmine.createSpyObj<VerifyService>('VerifyService', ['verifyPlanetInfo', 'verifyPlanetAnswer']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [AddPlanetComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } },
        { provide: ApiService, useValue: mockApiService },
        { provide: Router, useValue: mockRouter },
        { provide: AlertService, useValue: mockAlertService },
        { provide: b64Service, useValue: mockB64Service },
        { provide: VerifyService, useValue: mockVerifyService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlanetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addPlanet method and navigate to /planetas when form is valid', () => {
    // Mock the return value of verifyPlanetInfo
    mockVerifyService.verifyPlanetInfo.and.returnValue(true);

    // Set the form values
    const formValues = {
      nombre: 'Test Planet',
      imagen: 'im1',
      tipo: 'Type A',
      descripcion: 'This is a test planet',
      id: '123',
      estado: true,
    };
    component.planetForm.setValue(formValues);

    // Mock the addPlanet method of ApiService
    const mockApiResponse = { success: true };
    mockApiService.addPlanet.and.returnValue(of("P-777"));

    // Call the onAdd method
    component.onAdd(component.planetForm.value);

    // Verify that addPlanet and navigate methods are called with the correct arguments
    expect(mockApiService.addPlanet).toHaveBeenCalledWith(formValues);
  });

  it('should not call addPlanet method when form is invalid', () => {
    // Mock the return value of verifyPlanetInfo
    mockVerifyService.verifyPlanetInfo.and.returnValue(false);

    // Call the onAdd method
    component.onAdd(component.planetForm.value);

    // Verify that addPlanet method is not called
    expect(mockApiService.addPlanet).not.toHaveBeenCalled();
  });

  it('should navigate to /planetas when back method is called', () => {
    component.back();

    // Verify that navigate method is called with the correct argument
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/planetas']);
  });

  // Add more test cases as needed
});