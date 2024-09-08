import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule, IonTabs } from '@ionic/angular';

import { ListClientesPageRoutingModule } from './list-clientes-routing.module';
import { ListClientesPage } from './list-clientes/list-clientes.page';
import { AddClientePage } from './add-cliente/add-cliente.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from "../../pipes/pipes.module";



@NgModule({
    declarations: [ListClientesPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ListClientesPageRoutingModule,
        ComponentsModule,
        PipesModule,
        ReactiveFormsModule,
     
    ]
})
export class ListClientesPageModule { }
