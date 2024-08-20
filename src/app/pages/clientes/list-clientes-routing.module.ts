import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListClientesPage } from './list-clientes/list-clientes.page';



const routes: Routes = [
  {
    path: '',
    component: ListClientesPage
  },  {
    path: 'add-cliente',
    loadChildren: () => import('./add-cliente/add-cliente.module').then( m => m.AddClientePageModule)
  },
  {
    path: 'edit-cliente',
    loadChildren: () => import('./edit-cliente/edit-cliente.module').then( m => m.EditClientePageModule)
  },
  {
    path: 'registro-compras',
    loadChildren: () => import('./registro-compras/registro-compras.module').then( m => m.RegistroComprasPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListClientesPageRoutingModule { }
