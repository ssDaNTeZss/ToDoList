import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAndSignupPageComponent } from './login-and-signup-page.component';

describe('LoginAndSignupPageComponent', () => {
  let component: LoginAndSignupPageComponent;
  let fixture: ComponentFixture<LoginAndSignupPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginAndSignupPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginAndSignupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
