import { ComprasService } from './../../../service/compras.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { AddCompraPage } from '../add-compra/add-compra.page';

@Component({
  selector: 'app-registro-compras',
  templateUrl: './registro-compras.page.html',
  styleUrls: ['./registro-compras.page.scss'],
})
export class RegistroComprasPage implements OnInit {
  idCliente?: any;
  filteredItems: any[] = [];
  consumo: any;
  loading?: HTMLIonLoadingElement;
  isLoading: boolean = true;
  constructor(
    private comprasService: ComprasService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private toastCtrl: ToastController,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController
  ) {
    this.idCliente = this.route.snapshot.paramMap.get('idCliente');
  }

  ngOnInit() {
    this.loadData();
  }

  async addCompra() {
    const modal = await this.modalCtrl.create({
      component: AddCompraPage,
      componentProps: { id: this.idCliente }
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data && data.success) {
      await this.loadData();
    }
  }

  async getConsumo(): Promise<void> {

    try {
      this.comprasService.listComprasCliente(this.idCliente).subscribe(data => {
        this.consumo = data;
        this.filteredItems = [...this.consumo];
        this.presentToast('Información Cargada', 'success')
      });
    } catch (error) {
      console.log('Error al cargar Información', error);
      await this.presentToast('Error al cargar información', 'danger')
    }


  }

  async loadData() {
    this.loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      spinner: 'crescent'
    });
    await this.loading.present();

    try {
      await this.getConsumo();
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

  pagarTodo(idCliente: string, state: any): void {
    this.isLoading = true;
    state = 'pagado'
    this.comprasService.pagarTodo(idCliente, state).subscribe((res: any) => {

    })
  }

  filterItems(event: any) {
    const searchTerm = event.target.value.toLowerCase();

    this.filteredItems = this.consumo.filter((item: any) => {
      return item.nombreProducto.toLowerCase().includes(searchTerm)
    });
  }

  async doRefresh(event: any) {
    try {
      // Aquí puedes recargar tus datos, por ejemplo, llamando a loadData() o getUsuarios()
      await this.loadData();

      // Simula un retraso antes de terminar el refresco
      event.target.complete();

    } catch (error) {
      console.error('Error al refrescar los datos', error);
      event.target.complete(); // Finaliza el refresco incluso si hay un error
    }
  }


  async presentActionSheet(consumo: any) {
    const buttons = [];

    if (consumo.state === 'pendiente') {
      buttons.push({
        text: 'Pagar',
        icon: 'cash',
        handler: () => {
          this.pagarProducto(consumo.idCompra, consumo.state);
        }
      });
    }


    buttons.push({
      text: 'Eliminar Compra',
      icon: 'trash',
      role: 'destructive',
      handler: () => {
        this.deleteCompra(consumo);
      }
    });

    buttons.push({
      text: 'Cancelar',
      icon: 'close',
      role: 'cancel'
    });

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      buttons: buttons
    });

    await actionSheet.present();
  }

  async deleteCompra(compra: any) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar Eliminación',
      message: `¿Estás seguro de que deseas eliminar Producto: ${compra.nombreProducto}?`,
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
              await this.comprasService.deleteCompra(compra.idCompra).toPromise();
              await this.presentToast('Producto eliminado con éxito', 'success');
              await this.loadData();
            } catch (error) {
              console.error('Error al eliminar usuario', error);
              await this.presentToast('Error al eliminar Producto', 'danger');
            }
          }
        }
      ]
    });

    await alert.present();
  }

  pagarProducto(idCompra: number, state: any): void {
    this.alertCtrl.create({
      header: 'Confirmar Pago',
      message: '¿Estás seguro de que desea proceder con el pago?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Pago cancelado');
          }
        },
        {
          text: 'Pagar',
          handler: () => {
            this.isLoading = true;
            let stateChange = state;
            if (state == "pendiente") {
              stateChange = "pagado";
            } else {
              stateChange = "pendiente";
            }

            const data = { 'state': stateChange };
            this.comprasService.pagarProducto(idCompra, data).subscribe(
              (res: any) => {
                this.isLoading = false;
                if (state == "pendiente") {
                  this.loadData();
                  console.log('Producto pagado con éxito');
                  // Aquí puedes agregar más lógica si es necesario
                } else {
                  console.log('El estado del producto se ha cambiado a pendiente.');
                }
              },
              (error) => {
                this.isLoading = false;
                console.error('Error al cambiar el estado de la compra', error);
              }
            );
          }
        }
      ]
    }).then(alert => {
      alert.present();
    });
  }


}



