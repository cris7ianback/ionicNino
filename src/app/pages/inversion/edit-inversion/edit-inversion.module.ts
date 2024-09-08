import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditInversionPageRoutingModule } from './edit-inversion-routing.module';
import { EditInversionPage } from './edit-inversion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditInversionPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditInversionPage]
})
export class EditInversionPageModule { }
