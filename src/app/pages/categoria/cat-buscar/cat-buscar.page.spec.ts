import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatBuscarPage } from './cat-buscar.page';

describe('CatBuscarPage', () => {
  let component: CatBuscarPage;
  let fixture: ComponentFixture<CatBuscarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CatBuscarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
