import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCompraPageRoutingModule } from './add-compra-routing.module';

import { AddCompraPage } from './add-compra.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddCompraPageRoutingModule
  ],
  declarations: [AddCompraPage]
})
export class AddCompraPageModule {}
