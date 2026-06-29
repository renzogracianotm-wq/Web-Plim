import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProdRegistroPage } from './prod-registro.page';

describe('ProdRegistroPage', () => {
  let component: ProdRegistroPage;
  let fixture: ComponentFixture<ProdRegistroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdRegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
