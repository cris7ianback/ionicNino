import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RegistroComprasPage } from './pages/clientes/registro-compras/registro-compras.page';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'landing',
    loadChildren: () => import('./pages/landing/landing.module').then(m => m.LandingPageModule)
  },
  {
    path: 'stats',
    loadChildren: () => import('./pages/stats/stats.module').then(m => m.StatsPageModule)
  },

  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'productos',
    loadChildren: () => import('./pages/productos/productos.module').then(m => m.ProductosPageModule)
  },

  {
    path: 'list-usuarios',
    loadChildren: () => import('./pages/usuarios/list-usuarios/list-usuarios.module').then(m => m.ListUsuariosPageModule)
  },
  {
    path: 'list-inversion',
    loadChildren: () => import('./pages/inversion/list-inversion/list-inversion.module').then(m => m.ListInversionPageModule)
  },
  {
    path: 'list-clientes',
    loadChildren: () => import('./pages/clientes/list-clientes.module').then(m => m.ListClientesPageModule)
  },
  {
    path: 'add-usuarios',
    loadChildren: () => import('./pages/usuarios/add-usuarios/add-usuarios.module').then(m => m.AddUsuariosPageModule)
  },
  {
    path: 'edit-usuarios',
    loadChildren: () => import('./pages/usuarios/edit-usuarios/edit-usuarios.module').then(m => m.EditUsuariosPageModule)
  },
  {
    path: 'edit-password',
    loadChildren: () => import('./pages/usuarios/edit-password/edit-password.module').then(m => m.EditPasswordPageModule)
  },
  {
    path: 'registrarCompra/:idCliente', component: RegistroComprasPage
  },  {
    path: 'add-inversion',
    loadChildren: () => import('./pages/inversion/add-inversion/add-inversion.module').then( m => m.AddInversionPageModule)
  },
  {
    path: 'edit-inversion',
    loadChildren: () => import('./pages/inversion/edit-inversion/edit-inversion.module').then( m => m.EditInversionPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
