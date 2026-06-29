import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MiCompraPage } from './mi-compra.page';

describe('MiCompraPage', () => {
  let component: MiCompraPage;
  let fixture: ComponentFixture<MiCompraPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MiCompraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
