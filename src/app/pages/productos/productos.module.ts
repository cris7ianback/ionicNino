import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductosPageRoutingModule } from './productos-routing.module';

import { ProductosPage } from './list-productos/productos.page';
import { AddProductoPage } from './add-producto/add-producto.page';
import { EditProductosPage } from './edit-productos/edit-productos.page';

@NgModule({

  declarations: [
    ProductosPage,
    AddProductoPage,
    EditProductosPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductosPageRoutingModule,
    ReactiveFormsModule,
  ],
})
export class ProductosPageModule { }
