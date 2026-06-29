import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatEliminarPage } from './cat-eliminar.page';

describe('CatEliminarPage', () => {
  let component: CatEliminarPage;
  let fixture: ComponentFixture<CatEliminarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CatEliminarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
