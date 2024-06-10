import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from '../clientes.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-cliente',
  templateUrl: './add-cliente.page.html',
  styleUrls: ['./add-cliente.page.scss'],
})
export class AddClientePage implements OnInit {

  public addformCliente!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private clientesService: ClientesService
  ) {
    this.addformCliente = this.fb.group({
      nombre: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  addCliente() {

    if (this.addformCliente.valid) {
      this.clientesService.addCliente(this.addformCliente.value).subscribe({
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

  async close() {
    await this.modalCtrl.dismiss();
  }

}
