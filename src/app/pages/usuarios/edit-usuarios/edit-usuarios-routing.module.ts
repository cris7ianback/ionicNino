import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditUsuariosPage } from './edit-usuarios.page';

const routes: Routes = [
  {
    path: '',
    component: EditUsuariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditUsuariosPageRoutingModule {}
