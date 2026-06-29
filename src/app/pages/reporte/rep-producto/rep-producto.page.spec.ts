import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepProductoPage } from './rep-producto.page';

describe('RepProductoPage', () => {
  let component: RepProductoPage;
  let fixture: ComponentFixture<RepProductoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RepProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
