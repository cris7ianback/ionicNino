import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'productos',
    loadChildren: () => import('./pages/productos/list-productos/productos.module').then( m => m.ProductosPageModule)
  },
  {
    path: 'add-producto',
    loadChildren: () => import('./pages/productos/add-producto/add-producto.module').then( m => m.AddProductoPageModule)
  },
  {
    path: 'list-usuarios',
    loadChildren: () => import('./pages/usuarios/list-usuarios/list-usuarios.module').then( m => m.ListUsuariosPageModule)
  },
  {
    path: 'list-inversion',
    loadChildren: () => import('./pages/inversion/list-inversion/list-inversion.module').then( m => m.ListInversionPageModule)
  },
  {
    path: 'list-clientes',
    loadChildren: () => import('./pages/clientes/list-clientes/list-clientes.module').then( m => m.ListClientesPageModule)
  },
  {
    path: 'edit-productos',
    loadChildren: () => import('./pages/productos/edit-productos/edit-productos.module').then( m => m.EditProductosPageModule)
  },
  {
    path: 'confirm-delete',
    loadChildren: () => import('./pages/shared/confirm-delete/confirm-delete.module').then( m => m.ConfirmDeletePageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
