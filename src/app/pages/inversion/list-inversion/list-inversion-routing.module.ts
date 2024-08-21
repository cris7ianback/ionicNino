import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListInversionPage } from './list-inversion.page';

const routes: Routes = [
  {
    path: '',
    component: ListInversionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListInversionPageRoutingModule {}
