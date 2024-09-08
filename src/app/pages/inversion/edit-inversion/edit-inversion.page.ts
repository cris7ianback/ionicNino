import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { InversionService } from 'src/app/service/inversion.service';

@Component({
  selector: 'app-edit-inversion',
  templateUrl: './edit-inversion.page.html',
  styleUrls: ['./edit-inversion.page.scss'],
})
export class EditInversionPage implements OnInit {

  @Input() inversion: any;
  formEditInversion: FormGroup;

  constructor(private fb: FormBuilder,
    private modalCtrl: ModalController,
    private inversionService: InversionService) {
    this.formEditInversion = this.fb.group({
      productoInversion: ['', [Validators.required, Validators.minLength(3)]],
      cantidad: ['', [Validators.required, Validators.minLength(3)]],
      valor: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit() {
    if (this.inversion) {
      this.formEditInversion.patchValue({
        productoInversion: this.inversion.productoInversion,
        cantidad: this.inversion.cantidad,
        valor: this.inversion.valor
      });
    }
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  async editInversion() {
    if (this.formEditInversion?.valid) {
      try {
        await this.inversionService.editProductoInversion(
          this.formEditInversion.value, this.inversion.idInversion)
          .toPromise();
        await this.modalCtrl.dismiss({ success: true });
      } catch (error) {
        console.error('Error al editar producto', error);
      }
    }
  }

  campoEsValido(campo: string) {
    return (
      this.formEditInversion?.controls[campo].errors &&
      this.formEditInversion.controls[campo].touched
    );
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.formEditInversion?.controls[controlName].hasError(errorName);
  };

}
