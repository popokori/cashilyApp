import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransfertPage } from './transfert.page';

describe('TransfertPage', () => {
  let component: TransfertPage;
  let fixture: ComponentFixture<TransfertPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TransfertPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
