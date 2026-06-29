import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatRegistroPage } from './cat-registro.page';

describe('CatRegistroPage', () => {
  let component: CatRegistroPage;
  let fixture: ComponentFixture<CatRegistroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CatRegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
