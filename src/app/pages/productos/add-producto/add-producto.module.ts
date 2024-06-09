import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddProductoPageRoutingModule } from './add-producto-routing.module';

import { AddProductoPage } from './add-producto.page';

@NgModule({
  
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddProductoPageRoutingModule
  ],
  declarations: [AddProductoPage]
})
export class AddProductoPageModule {}
