import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerTemasPage } from './per-temas.page';

describe('PerTemasPage', () => {
  let component: PerTemasPage;
  let fixture: ComponentFixture<PerTemasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PerTemasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
