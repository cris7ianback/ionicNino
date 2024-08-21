import { ComprasService } from './../../../service/compras.service';
import { RegistroComprasPage } from './../registro-compras/registro-compras.page';
import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../../service/clientes.service';
import { AddClientePage } from '../add-cliente/add-cliente.page';
import { ActionSheetController, AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { EditClientePage } from '../edit-cliente/edit-cliente.page';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-clientes',
  templateUrl: './list-clientes.page.html',
  styleUrls: ['./list-clientes.page.scss'],
})
export class ListClientesPage implements OnInit {
  // Control para el texto de búsqueda
  searchControl: FormControl = new FormControl('');
  listClientes: any;
  searchText: string = '';
  loading?: HTMLIonLoadingElement;
  textoBuscar: string = '';
  constructor(
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private clientesService: ClientesService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private router: Router,
    private comprasService: ComprasService
  ) { }

  ngOnInit() {
    this.loadData();
    // this.listarClientes()
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
              await this.presentToast('Usuario eliminado con éxito', 'success');
              await this.loadData();
            } catch (error) {
              console.error('Error al eliminar usuario', error);
              await this.presentToast('Error al eliminar usuario', 'danger');
            }
          }
        }
      ]
    });

    await alert.present();
  }

  listarClientes() {
    this.clientesService.listClientes().subscribe((res: any) => {
      this.listClientes = res;
    })
  }

  onSearchChange(event: any) {
    this.textoBuscar = event.detail.value;
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
            // this.registrarCompra(cliente.idCliente, cliente.nombre);
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

  async loadData() {
    this.loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      spinner: 'crescent'
    });
    await this.loading.present();

    try {
      await this.getClientes();
    } finally {
      await this.loading.dismiss();
    }
  }

  async presentToast(message: string, color: 'success' | 'danger' | 'warning') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color,
    });
    await toast.present();
  }


  async getClientes(): Promise<void> {
    try {
      const clientes = await this.clientesService.listClientes().toPromise();
      this.listClientes = clientes;
    } catch (error) {
      console.error('Error al cargar los clientes', error);
      await this.presentToast('Error al cargar los clientes', 'danger');
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


}
