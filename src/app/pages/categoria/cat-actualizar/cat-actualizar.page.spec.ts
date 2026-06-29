import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatActualizarPage } from './cat-actualizar.page';

describe('CatActualizarPage', () => {
  let component: CatActualizarPage;
  let fixture: ComponentFixture<CatActualizarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CatActualizarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
