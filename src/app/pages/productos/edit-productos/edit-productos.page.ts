import { Component, Inject, Input, OnInit, Optional, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ProductosService } from '../productos.service';

@Component({
  selector: 'app-edit-productos',
  templateUrl: './edit-productos.page.html',
  styleUrls: ['./edit-productos.page.scss'],
})
export class EditProductosPage implements OnInit {
  formEditProducto!: FormGroup;
  data: any;
  @Input() producto: any;
  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    @Optional() @Inject('producto') public componentProps: any,
    private productoService: ProductosService
  ) {
    this.formEditProducto = this.fb.group({
      nombre: ['', [Validators.required]],
      cantidad: ['', [Validators.required]],
      valor: ['', [Validators.required]],
    });

  }

  ngOnInit() {
    if (this.producto) {
      this.formEditProducto.patchValue(this.producto); // Populate the form
    } else {
      console.log("No data passed to EditProductosPage");

    }
  }


  async editProducto() {
    if (this.formEditProducto.valid) {
      this.productoService.editProducto(this.formEditProducto.value, this.producto.idProducto).subscribe({
        next: (res: any) => {
          if (res.status === "success") {
            this.modalCtrl.dismiss();
            console.log("Producto Editado")
          }
        },
        error: (error: any) => {
          console.log("Error al Editar")
        }
      })
    }
  }




  async cancel() {
    await this.modalCtrl.dismiss();
  }
}
