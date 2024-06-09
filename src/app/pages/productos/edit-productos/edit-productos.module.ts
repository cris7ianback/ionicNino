import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditProductosPageRoutingModule } from './edit-productos-routing.module';

import { EditProductosPage } from './edit-productos.page';
import { ProductosService } from '../productos.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditProductosPageRoutingModule
  ],
  providers: [ProductosService],
  declarations: [EditProductosPage]
})
export class EditProductosPageModule { }
