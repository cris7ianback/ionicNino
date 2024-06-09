import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductosPageRoutingModule } from './productos-routing.module';

import { ProductosPage } from './productos.page';
import { AddProductoPage } from '../add-producto/add-producto.page';
import { AddProductoPageModule } from '../add-producto/add-producto.module';
import { EditProductosPage } from '../edit-productos/edit-productos.page';

@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductosPageRoutingModule,
    AddProductoPageModule,
    

  ],
  declarations: [ProductosPage]
})
export class ProductosPageModule { }
