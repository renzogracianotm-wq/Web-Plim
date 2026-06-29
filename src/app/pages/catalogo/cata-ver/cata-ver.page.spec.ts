import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CataVerPage } from './cata-ver.page';

describe('CataVerPage', () => {
  let component: CataVerPage;
  let fixture: ComponentFixture<CataVerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CataVerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
