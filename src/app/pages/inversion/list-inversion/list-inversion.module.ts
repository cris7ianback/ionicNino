import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListInversionPageRoutingModule } from './list-inversion-routing.module';

import { ListInversionPage } from './list-inversion.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListInversionPageRoutingModule,
    ComponentsModule,
    PipesModule
  ],
  declarations: [ListInversionPage]
})
export class ListInversionPageModule { }
