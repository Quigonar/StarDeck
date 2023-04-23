import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstLoginLayoutComponent } from './first-login-layout.component';

describe('FirstLoginLayoutComponent', () => {
  let component: FirstLoginLayoutComponent;
  let fixture: ComponentFixture<FirstLoginLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstLoginLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstLoginLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
