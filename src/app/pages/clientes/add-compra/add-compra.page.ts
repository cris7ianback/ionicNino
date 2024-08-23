import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from '../../productos/productos.service';
import { ComprasService } from 'src/app/service/compras.service';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-compra',
  templateUrl: './add-compra.page.html',
  styleUrls: ['./add-compra.page.scss'],
})
export class AddCompraPage implements OnInit {
  @Input() id?: number;
  @Output() compraAdded = new EventEmitter<void>();

  formAddCompra!: FormGroup;
  selected?: any;
  viewProducto: any;
  productos?: any;

  constructor(
    private fb: FormBuilder,
    private productosService: ProductosService,
    private comprasService: ComprasService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {
    this.formAddCompra = this.fb.group({
      idCliente: [this.id],
      idProducto: ['', Validators.required],
      valor: [''],
      cantidad: ['1', Validators.required]

    });
  }

  ngOnInit() {

    if (this.id) {
      // Establecer el ID del cliente en el formulario
      this.formAddCompra.get('idCliente')?.patchValue(this.id);
    }
    this.listProductos();
  }

  productoSelected(event: Event) {
    this.viewProducto = true;
    const data = this.selected;
  }

  async addProducto(producto: any) {
    this.formAddCompra.get('valor')?.patchValue(producto.valor);
    this.formAddCompra.get('idProducto')?.patchValue(producto.idProducto);

    if (this.formAddCompra.valid) {
      try {
        const response = await this.comprasService.addCompras(this.formAddCompra.value).toPromise();
        if (response.status === 'success') {
          this.presentToast('Producto Añadido con éxito', 'success');
          this.modalCtrl.dismiss({ success: true });
        } else {
          await this.presentToast('Error al añadir producto', 'danger');
          await this.modalCtrl.dismiss({ success: false });
        }
      } catch (error) {
        console.error('Error al añadir producto', error);
        await this.presentToast('Error al añadir producto', 'danger');
        await this.modalCtrl.dismiss({ success: false });
      }

      // this.comprasService.addCompras(this.formAddCompra.value).subscribe({
      //   next: (res: any) => {
      //     if (res.status === 'success') {
      //       this.compraAdded.emit();
      //       this.presentToast('Producto Añadido con éxito', 'success');
      //       this.modalCtrl.dismiss('Registrar');
      //     }
      //   },
      //   error: (error: any) => {
      //     if (error.error.status === 'failed') {
      //       this.presentToast('Error al añadir Producto', 'danger');
      //       console.log(error)
      //     } else {
      //       this.presentToast('Error al añadir Producto', 'danger');
      //       console.log(error)

      //     }
      //   }
      // });
    } else {
      await this.presentToast('Por favor completa todos los campos correctamente', 'warning');
    }
  }

  listProductos() {
    this.productosService.listProductos().subscribe((data) => {
      this.productos = data;

    })
  }

  cancelar() {
    this.presentToast('Acción Cancelada', 'warning');
    this.modalCtrl.dismiss();
  }

  async presentToast(message: string, color: 'success' | 'danger' | 'warning') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color,
    });
    await toast.present();
  }

}
