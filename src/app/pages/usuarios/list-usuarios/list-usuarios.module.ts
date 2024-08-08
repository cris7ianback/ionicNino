import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListUsuariosPageRoutingModule } from './list-usuarios-routing.module';

import { ListUsuariosPage } from './list-usuarios.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListUsuariosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ListUsuariosPage]
})
export class ListUsuariosPageModule { }
