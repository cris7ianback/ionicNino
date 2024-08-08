import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListClientesPageRoutingModule } from './list-clientes-routing.module';
import { ListClientesPage } from './list-clientes/list-clientes.page';
import { AddClientePage } from './add-cliente/add-cliente.page';
import { ComponentsModule } from 'src/app/components/components.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListClientesPageRoutingModule,
    ComponentsModule

  ],
  declarations: [ListClientesPage]
})
export class ListClientesPageModule { }
