import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ActionSheetController, AlertController } from '@ionic/angular';
import { ProductosService } from 'src/app/pages/productos/productos.service';
import { AddProductoPage } from '../add-producto/add-producto.page';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { EditProductosPage } from '../edit-productos/edit-productos.page';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
  data: any;
  listProductos: any;
  initialData: any;
  // producto: any
  @Input() producto: any;
  constructor(
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private productoService: ProductosService,
  ) { }


  ngOnInit() {

    this.listarProductos();
  }


  async addProducto() {
    const modal = await this.modalCtrl.create({
      component: AddProductoPage,
    });

    return modal.present();
  }

  listarProductos() {
    this.productoService.listProductos().subscribe((res: any) => {
      this.listProductos = res;
    })
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
            productId: productoId, // Pass product ID for confirmation
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

}
