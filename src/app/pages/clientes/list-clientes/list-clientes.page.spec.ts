import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListClientesPage } from './list-clientes.page';

describe('ListClientesPage', () => {
  let component: ListClientesPage;
  let fixture: ComponentFixture<ListClientesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListClientesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
