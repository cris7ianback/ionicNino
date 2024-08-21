import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-add-usuarios',
  templateUrl: './add-usuarios.page.html',
  styleUrls: ['./add-usuarios.page.scss'],
})
export class AddUsuariosPage implements OnInit {

  formAddUsuario!: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private usuariosService: UsuarioService,
    private toastCtrl: ToastController
  ) {
    this.formAddUsuario = this.fb.group({
      nombre: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit() {
  }

  async addUsuario() {
    if (this.formAddUsuario.valid) {
      try {
        const response = await this.usuariosService.addUsuario(this.formAddUsuario.value).toPromise();
        if (response.status === 'success') {
          await this.presentToast('Usuario Añadido con éxito', 'success');
          await this.modalCtrl.dismiss({ success: true });
        } else {
          await this.presentToast('Error al añadir Usuario', 'danger');
          await this.modalCtrl.dismiss({ success: false });
        }
      } catch (error) {
        console.error('Error al añadir usuario', error);
        await this.presentToast('Error al añadir usuario', 'danger');
        await this.modalCtrl.dismiss({ success: false });
      }
    } else {
      await this.presentToast('Por favor completa todos los campos correctamente', 'warning');
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
