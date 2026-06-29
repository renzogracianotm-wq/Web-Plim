import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProdActualizarPage } from './prod-actualizar.page';

describe('ProdActualizarPage', () => {
  let component: ProdActualizarPage;
  let fixture: ComponentFixture<ProdActualizarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdActualizarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
