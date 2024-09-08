import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditInversionPage } from './edit-inversion.page';

const routes: Routes = [
  {
    path: '',
    component: EditInversionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditInversionPageRoutingModule {}
