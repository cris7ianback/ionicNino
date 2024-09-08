import { ComprasService } from './../../../service/compras.service';
import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../../service/clientes.service';
import { AddClientePage } from '../add-cliente/add-cliente.page';
import { ActionSheetController, AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { EditClientePage } from '../edit-cliente/edit-cliente.page';
import { Router } from '@angular/router';
import { AllServices } from 'src/app/service/all.service';

@Component({
  selector: 'app-list-clientes',
  templateUrl: './list-clientes.page.html',
  styleUrls: ['./list-clientes.page.scss'],
})
export class ListClientesPage implements OnInit {

  clientes: any[] = [];
  loading?: HTMLIonLoadingElement;
  filteredItems: any[] = [];
  clientesConDeuda: any[] = [];
  clientesSinDeuda: any[] = [];
  selectedSegment: string = 'conDeuda';


  constructor(
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private clientesService: ClientesService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private allService: AllServices,
    private router: Router,
    private comprasService: ComprasService) { }

  ngOnInit() {
    this.loadData();
  }

  async addCliente() {
    const modal = await this.modalCtrl.create({
      component: AddClientePage,
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data && data.success) {
      await this.loadData();
    }
  }

  async editCliente(cliente: any) {

    const modal = await this.modalCtrl.create({
      component: EditClientePage,
      componentProps: { cliente }
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data && data.success) {
      await this.loadData();
    }
  }

  async deleteCliente(cliente: any) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar Eliminación',
      message: `¿Estás seguro de que deseas eliminar al Cliente: ${cliente.nombre}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Eliminación cancelada');
          }
        },
        {
          text: 'Eliminar',
          handler: async () => {
            try {
              await this.clientesService.deleteCliente(cliente.idCliente).toPromise();
              await this.allService.presentToast('Usuario eliminado con éxito', 'success');

              await this.loadData();
            } catch (error) {
              console.error('Error al eliminar usuario', error);
              await this.allService.presentToast('Error al eliminar usuario', 'danger');
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async presentActionSheet(cliente: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      buttons: [
        {
          text: 'Comprar',
          icon: 'bag-handle-outline',
          handler: () => {
            console.log(cliente.idCliente)
            this.router.navigate(['/registrarCompra', cliente.idCliente])
          }
        },
        {
          text: 'Editar',
          icon: 'create',
          handler: () => {
            this.editCliente(cliente);
          }
        },

        {
          text: 'Eliminar',
          icon: 'trash',
          role: 'destructive',
          handler: () => {
            this.deleteCliente(cliente);
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

  async getClientes(): Promise<void> {
    try {
      const clientes = await this.clientesService.listClientes().toPromise();
      this.clientes = clientes;
      this.filteredItems = [...this.clientes]
    } catch (error) {
      console.error('Error al cargar los clientes', error);
      await this.allService.presentToast('Error al cargar los clientes', 'danger');
    }
  }


  async pagarTodo(idCliente: string, state: any) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar Pago',
      message: '¿Está seguro que desea saldar deuda?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Pago cancelado');
          }
        },
        {
          text: 'Pagar',
          handler: () => {
            console.log('Pagar todo confirmado');
            // Lógica para proceder con el pago
            state = 'pagado'
            this.comprasService.pagarTodo(idCliente, state).subscribe((res: any) => {
              this.ngOnInit();

            })
          }
        }
      ]

    })
    await alert.present();
  }

  registrarCompra(idCliente: any, nombre: any) {
    this.router.navigate(['/registrarCompra', idCliente])

  }


  async doRefresh(event: any) {
    await this.allService.refreshData(() => this.loadData(), event);
  }


  async loadData() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      spinner: 'crescent'
    });
    await loading.present();

    try {
      const clientes = await this.clientesService.listClientes().toPromise();
      this.clientes = clientes;
      this.separarClientes();
    } catch (error) {
      console.error('Error al cargar los clientes', error);
      await this.allService.presentToast('Error al cargar los clientes', 'danger');
    } finally {
      await loading.dismiss();
    }
  }

  separarClientes() {
    this.clientesConDeuda = this.clientes.filter(clientes => clientes.totalCompras > 0);
    this.clientesSinDeuda = this.clientes.filter(clientes => clientes.totalCompras == 0);

    console.log('Clientes con Deuda:', this.clientesConDeuda);
    console.log('Clientes sin Deuda:', this.clientesSinDeuda);
  }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

  filterItems(event: any, tipo: string) {
    const searchTerm = event.target.value.toLowerCase();

    if (tipo === 'conDeuda') {
      this.clientesConDeuda = this.clientes.filter(cliente =>
        cliente.totalCompras > 0 && cliente.nombre.toLowerCase().includes(searchTerm));
    } else if (tipo === 'sinDeuda') {
      this.clientesSinDeuda = this.clientes.filter(cliente =>
        cliente.totalCompras === 0 && cliente.nombre.toLowerCase().includes(searchTerm));
    }
  }




}
