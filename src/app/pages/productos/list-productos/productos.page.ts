import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ActionSheetController, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ProductosService } from 'src/app/pages/productos/productos.service';
import { AddProductoPage } from '../add-producto/add-producto.page';
import { EditProductosPage } from '../edit-productos/edit-productos.page';
import { AllServices } from 'src/app/service/all.service';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  listProductos: any;
  loading?: HTMLIonLoadingElement;
  filteredItems: any[] = [];

  constructor(
    private allServices: AllServices,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private productoService: ProductosService,
  ) { }


  ngOnInit() {
    this.loadData();
  }

  async addProducto() {
    const modal = await this.modalCtrl.create({
      component: AddProductoPage,
    });

    return modal.present();
  }

  async getProductos(): Promise<void> {
    try {
      const listProductos = await this.productoService.listProductos()
        .toPromise();
      this.listProductos = listProductos;
      console.log(this.listProductos)
      this.filteredItems = [...this.listProductos];
      await this.allServices.presentToast('Productos Cargados', 'success');

    } catch (error) {
      console.error('Error al cargar los usuarios', error);
      await this.allServices.presentToast('Error al cargar los productos', 'danger');
    }
  }


  async loadData() {
    this.loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      spinner: 'crescent'
    });
    await this.loading.present();
    try {
      await this.getProductos();
    } finally {
      await this.loading.dismiss();
    }
  }


  async deleteProducto(productoId: string) {

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Confirmar Eliminación',
      buttons: [
        {
          text: 'Eliminar',
          role: 'destructive',
          data: {
            action: 'delete',
            productId: productoId,
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();

    if (role === 'destructive' && data.action === 'delete') {
      // Confirmed deletion, proceed with actual deletion
      this.productoService.deleteProducto(data.productId)
        .subscribe(
          (response) => {
            if (response.status === 'success') {
              this.presentAlert('Producto Eliminado', 'El producto se ha eliminado correctamente.');
              this.ngOnInit();
            } else {
              console.error('Error al eliminar el producto:', response.message);
              // Display an error message to the user (e.g., using a toast notification)
            }
          },
          (error) => {
            console.error('Error inesperado al eliminar el producto:', error);

          }
        );
    }
  }


  async editProducto(producto: any) {
    try {
      const modal = await this.modalCtrl.create({
        component: EditProductosPage,
        componentProps: { producto: producto }
      });

      await modal.present();
    } catch (error) {
      console.error('Error creating modal:', error); // Handle modal creation error
    }

  }


  async presentAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: [
        {
          text: 'Aceptar',
          role: 'cancel',
        },
      ],
    });

    await alert.present();
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


  filterItems(event: any) {
    const searchTerm = event.target.value.toLowerCase();

    this.filteredItems = this.listProductos.filter((item: any) => {
      return item.nombre.toLowerCase().includes(searchTerm) ||
        item.username.toLowerCase().includes(searchTerm);
    });
  }

}
