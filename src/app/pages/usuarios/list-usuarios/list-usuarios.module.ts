import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListUsuariosPageRoutingModule } from './list-usuarios-routing.module';

import { ListUsuariosPage } from './list-usuarios.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListUsuariosPageRoutingModule,
    ComponentsModule,
    PipesModule
  ],
  declarations: [ListUsuariosPage]
})
export class ListUsuariosPageModule { }
