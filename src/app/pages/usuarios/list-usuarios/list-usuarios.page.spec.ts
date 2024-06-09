import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListUsuariosPage } from './list-usuarios.page';

describe('ListUsuariosPage', () => {
  let component: ListUsuariosPage;
  let fixture: ComponentFixture<ListUsuariosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUsuariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
