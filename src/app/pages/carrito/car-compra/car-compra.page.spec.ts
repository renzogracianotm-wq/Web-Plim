import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarCompraPage } from './car-compra.page';

describe('CarCompraPage', () => {
  let component: CarCompraPage;
  let fixture: ComponentFixture<CarCompraPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CarCompraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
