import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListInversionPage } from './list-inversion.page';

describe('ListInversionPage', () => {
  let component: ListInversionPage;
  let fixture: ComponentFixture<ListInversionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInversionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
