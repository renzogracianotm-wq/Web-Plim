import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerUsuPage } from './per-usu.page';

describe('PerUsuPage', () => {
  let component: PerUsuPage;
  let fixture: ComponentFixture<PerUsuPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PerUsuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
