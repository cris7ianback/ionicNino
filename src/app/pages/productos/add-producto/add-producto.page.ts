import { Component, Input, OnInit, input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ProductosService } from '../productos.service';

@Component({
  selector: 'app-add-producto',
  templateUrl: './add-producto.page.html',
  styleUrls: ['./add-producto.page.scss'],
})
export class AddProductoPage implements OnInit {

  public addProductoForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private productoService: ProductosService,
  ) {
    this.addProductoForm = this.fb.group({
      nombre: ['', [Validators.required,]],
      cantidad: ['', [Validators.required]],
      valor: ['!', [Validators.required]]
    });
  }

  async close() {
    await this.modalCtrl.dismiss();
  }

  ngOnInit() {
  }

  addProducto() {
    if (this.addProductoForm.valid) {
      this.productoService.addProducto(this.addProductoForm.value).subscribe({
        next: (res: any) => {
          if (res.status === 'success') {
            this.close();
            console.log("Producto Ingresado")
          }
        },
        error: (error: any) => {
          if (error.error.status === 'failed') {
            console.log("Erorr al Ingresar")

          }
        }
      })
    }
  }

}
