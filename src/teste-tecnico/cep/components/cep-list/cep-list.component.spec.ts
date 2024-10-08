import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CepListComponent } from './cep-list.component';

describe('CepListComponent', () => {
  let component: CepListComponent;
  let fixture: ComponentFixture<CepListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CepListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CepListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
