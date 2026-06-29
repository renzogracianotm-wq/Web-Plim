import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProdBuscarPage } from './prod-buscar.page';

describe('ProdBuscarPage', () => {
  let component: ProdBuscarPage;
  let fixture: ComponentFixture<ProdBuscarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdBuscarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
