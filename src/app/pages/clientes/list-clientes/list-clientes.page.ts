import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../clientes.service';
import { AddClientePage } from '../add-cliente/add-cliente.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-list-clientes',
  templateUrl: './list-clientes.page.html',
  styleUrls: ['./list-clientes.page.scss'],
})
export class ListClientesPage implements OnInit {

  listClientes: any;
  constructor(
    private clientesService: ClientesService,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    this.listarClientes()
  }


  async addCliente() {
    const modal = await this.modalCtrl.create({
      component: AddClientePage,
    });

    return modal.present();
  }
  editCliente(idCliente: any) { }
  deleteCliente(idCliente: any) { }

  listarClientes() {
    this.clientesService.listClientes().subscribe((res: any) => {
      this.listClientes = res;
    })
  }

}
