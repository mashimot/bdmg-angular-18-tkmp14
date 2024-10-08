import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CepFormComponent } from './cep-form.component';

describe('CepFormComponent', () => {
  let component: CepFormComponent;
  let fixture: ComponentFixture<CepFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CepFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CepFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
