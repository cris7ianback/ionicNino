import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListInversionPageRoutingModule } from './list-inversion-routing.module';

import { ListInversionPage } from './list-inversion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListInversionPageRoutingModule
  ],
  declarations: [ListInversionPage]
})
export class ListInversionPageModule {}
