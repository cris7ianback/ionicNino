import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditUsuariosPageRoutingModule } from './edit-usuarios-routing.module';

import { EditUsuariosPage } from './edit-usuarios.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditUsuariosPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [EditUsuariosPage]
})
export class EditUsuariosPageModule { }
