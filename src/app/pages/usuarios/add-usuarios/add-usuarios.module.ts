import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddUsuariosPageRoutingModule } from './add-usuarios-routing.module';

import { AddUsuariosPage } from './add-usuarios.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddUsuariosPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [AddUsuariosPage]
})
export class AddUsuariosPageModule { }
