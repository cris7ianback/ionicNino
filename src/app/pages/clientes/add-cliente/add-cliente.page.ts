import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from '../clientes.service';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-cliente',
  templateUrl: './add-cliente.page.html',
  styleUrls: ['./add-cliente.page.scss'],
})
export class AddClientePage implements OnInit {

  addformCliente!: FormGroup;

  constructor(
    private clientesService: ClientesService,
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {
    this.addformCliente = this.fb.group({
      nombre: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  async addCliente() {

    if (this.addformCliente.valid) {
      try {
        const response = await this.clientesService.addCliente(this.addformCliente.value).toPromise();
        if (response.status === 'success') {
          await this.presentToast('Cliente Añadido con éxito', 'success');
          await this.modalCtrl.dismiss({ success: true });
        } else {
          await this.presentToast('Error al añadir Cliente', 'danger');
          await this.modalCtrl.dismiss({ success: false });
        }
      } catch (error) {
        await this.presentToast('Error al añadir cliente', 'danger');
        await this.modalCtrl.dismiss({ success: false });
      }


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

  cancelar() {
    this.modalCtrl.dismiss();
  }

}
