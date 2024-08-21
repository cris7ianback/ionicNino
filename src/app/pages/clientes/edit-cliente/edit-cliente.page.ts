import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ClientesService } from '../../../service/clientes.service';

@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.page.html',
  styleUrls: ['./edit-cliente.page.scss'],
})
export class EditClientePage implements OnInit {

  @Input() cliente: any;
  formEditCliente: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private clientesService: ClientesService
  ) {
    this.formEditCliente = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit() {
    if (this.cliente) {
      this.formEditCliente?.patchValue({
        nombre: this.cliente.nombre
      });
    }
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  async editCliente() {
    if (this.formEditCliente?.valid) {
      try {
        await this.clientesService.editCliente(this.formEditCliente.value, this.cliente.idCliente).toPromise();
        await this.modalCtrl.dismiss({ success: true });
      } catch (error) {
        console.error('Error al editar usuario', error);
      }
    }
  }

  campoEsValido(campo: string) {
    return (
      this.formEditCliente?.controls[campo].errors &&
      this.formEditCliente?.controls[campo].touched
    );
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.formEditCliente?.controls[controlName].hasError(errorName);
  };

}
