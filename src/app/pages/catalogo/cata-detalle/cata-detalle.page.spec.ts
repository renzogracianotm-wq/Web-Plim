import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CataDetallePage } from './cata-detalle.page';

describe('CataDetallePage', () => {
  let component: CataDetallePage;
  let fixture: ComponentFixture<CataDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CataDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
