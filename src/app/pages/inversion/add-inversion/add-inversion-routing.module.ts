import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddInversionPage } from './add-inversion.page';

const routes: Routes = [
  {
    path: '',
    component: AddInversionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddInversionPageRoutingModule {}
