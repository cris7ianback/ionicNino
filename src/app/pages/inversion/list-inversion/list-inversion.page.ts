import { Component, OnInit } from '@angular/core';
import { AlertController, ActionSheetController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { InversionService } from 'src/app/service/inversion.service';
import { AddInversionPage } from '../add-inversion/add-inversion.page';
import { EditInversionPage } from '../edit-inversion/edit-inversion.page';

@Component({
  selector: 'app-list-inversion',
  templateUrl: './list-inversion.page.html',
  styleUrls: ['./list-inversion.page.scss'],
})
export class ListInversionPage implements OnInit {

  inversion: any[] = [];
  loading?: HTMLIonLoadingElement;
  filteredItems: any[] = [];

  constructor(
    private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private inversionService: InversionService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      spinner: 'crescent'
    });
    await this.loading.present();

    try {
      await this.getInversion();
    } finally {
      await this.loading.dismiss();
    }
  }

  async getInversion(): Promise<void> {
    try {
      const inversion = await this.inversionService.listProductosInversion().toPromise();
      this.inversion = inversion;
      console.log(inversion)
      this.filteredItems = [...this.inversion];
    } catch (error) {
      console.error('Error al cargar los usuarios', error);
      await this.presentToast('Error al cargar los usuarios', 'danger');
    }
  }

  async presentActionSheet(inversion: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      buttons: [
        {
          text: 'Editar',
          icon: 'create',
          handler: () => {
            this.editInversion(inversion);
          }
        },
        {
          text: 'Eliminar',
          icon: 'trash',
          role: 'destructive',
          handler: () => {
            this.deleteInversion(inversion);
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

  async addInversion() {
    const modal = await this.modalCtrl.create({
      component: AddInversionPage
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data && data.success) {
      await this.loadData();
    }
  }

  async editInversion(inversion: any) {
    const modal = await this.modalCtrl.create({
      component: EditInversionPage,
      componentProps: { inversion }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data && data.success) {
      await this.loadData();
    }
  }

  async presentToast(message: string, color: 'success' | 'danger' | 'warning') {
    const toast = await this.toastCtrl.create({ message, duration: 2000, color });
    await toast.present();
  }

  filterItems(event: any) {
    const searchTerm = event.target.value.toLowerCase();

    this.filteredItems = this.inversion.filter(item => {
      return item.nombre.toLowerCase().includes(searchTerm) ||
        item.username.toLowerCase().includes(searchTerm);
    });
  }

  async doRefresh(event: any) {
    try {
      await this.loadData();
      event.target.complete();
    } catch (error) {
      console.error('Error al refrescar los datos', error);
      event.target.complete();
    }
  }

  async deleteInversion(inversion: any) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar Eliminación',
      message: `¿Estás seguro de que deseas eliminar el producto: ${inversion.productoInversion}?`,
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
              await this.inversionService.deleteProductoInversion(inversion.idInversion).toPromise();
              await this.presentToast('Producto eliminado con éxito', 'success');
              await this.loadData();
            } catch (error) {
              console.error('Error al eliminar Producto', error);
              await this.presentToast('Error al eliminar producto', 'danger');
            }
          }
        }
      ]
    });

    await alert.present();
  }

}
