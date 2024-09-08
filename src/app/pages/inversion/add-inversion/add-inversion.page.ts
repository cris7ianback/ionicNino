import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { InversionService } from 'src/app/service/inversion.service';

@Component({
  selector: 'app-add-inversion',
  templateUrl: './add-inversion.page.html',
  styleUrls: ['./add-inversion.page.scss'],
})
export class AddInversionPage implements OnInit {

  addformInversion!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private inversionService: InversionService
  ) {

    this.addformInversion = this.fb.group({
      productoInversion: ['', [Validators.required]],
      cantidad: ['', [Validators.required]],
      valor: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  async addInversion() {
    if (this.addformInversion.valid) {
      try {
        const response = await this.inversionService.addProductoInversion(this.addformInversion.value).toPromise();
        if (response.status === 'success') {
          await this.presentToast('Producto Añadido con éxito', 'success');
          await this.modalCtrl.dismiss({ success: true });
        } else {
          await this.presentToast('Error al añadir Producto', 'danger');
          await this.modalCtrl.dismiss({ success: false });
        }
      } catch (error) {
        await this.presentToast('Error al añadir Producto', 'danger');
        await this.modalCtrl.dismiss({ success: false });
      }


    }
  }

  cancelar() {
    this.modalCtrl.dismiss();
  }

  async presentToast(message: string, color: 'success' | 'danger' | 'warning') {
    const toast = await this.toastCtrl.create({ message, duration: 2000, color });
    await toast.present();
  }

}
