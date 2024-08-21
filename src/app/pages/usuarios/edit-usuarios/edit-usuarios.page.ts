import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-edit-usuarios',
  templateUrl: './edit-usuarios.page.html',
  styleUrls: ['./edit-usuarios.page.scss'],
})
export class EditUsuariosPage implements OnInit {

  @Input() usuario: any;
  formEditUser: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private usuariosService: UsuarioService
  ) {
    this.formEditUser = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit() {
    if (this.usuario) {
      this.formEditUser.patchValue({
        nombre: this.usuario.nombre
      });
    }
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  async editUser() {
    if (this.formEditUser.valid) {
      try {
        await this.usuariosService.editUsuario(this.formEditUser.value, this.usuario.idUser).toPromise();
        await this.modalCtrl.dismiss({ success: true });
      } catch (error) {
        console.error('Error al editar usuario', error);
      }
    }
  }

  campoEsValido(campo: string) {
    return (
      this.formEditUser.controls[campo].errors &&
      this.formEditUser.controls[campo].touched
    );
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.formEditUser.controls[controlName].hasError(errorName);
  };
}