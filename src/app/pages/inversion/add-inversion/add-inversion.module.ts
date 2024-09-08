import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddInversionPageRoutingModule } from './add-inversion-routing.module';

import { AddInversionPage } from './add-inversion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddInversionPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddInversionPage]
})
export class AddInversionPageModule { }
