import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.page.html',
  styleUrls: ['./edit-password.page.scss'],
})
export class EditPasswordPage implements OnInit {

  @Input() usuarioId: any;  // Recibe el id del usuario desde el componente padre
  formChangePassword: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private usuariosService: UsuarioService
  ) {
    this.formChangePassword = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordsMatch });
  }

  ngOnInit() { }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  async changePassword() {
    if (this.formChangePassword.valid) {
      const { newPassword } = this.formChangePassword.value;

      try {
        await this.usuariosService.changePassword({ newPassword, confirmPassword: this.formChangePassword.value.confirmPassword }, this.usuarioId).toPromise();
        await this.modalCtrl.dismiss({ success: true });
      } catch (error) {
        console.error('Error al cambiar la contraseña', error);
      }
    }
  }

  passwordsMatch(group: FormGroup) {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }

  hasError(controlName: string, errorName: string) {
    return this.formChangePassword.controls[controlName].hasError(errorName);
  }
}
