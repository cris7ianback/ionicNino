import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from '../../../service/clientes.service';
import { ModalController } from '@ionic/angular';
import { AllServices } from 'src/app/service/all.service';

@Component({
  selector: 'app-add-cliente',
  templateUrl: './add-cliente.page.html',
  styleUrls: ['./add-cliente.page.scss'],
})
export class AddClientePage implements OnInit {

  addformCliente!: FormGroup;

  constructor(
    private allServices: AllServices,
    private clientesService: ClientesService,
    private fb: FormBuilder,
    private modalCtrl: ModalController) {
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
          await this.allServices.presentToast('Cliente Añadido con éxito', 'success');
          await this.modalCtrl.dismiss({ success: true });
        } else {
          await this.allServices.presentToast('Error al añadir Cliente', 'danger');
          await this.modalCtrl.dismiss({ success: false });
        }
      } catch (error) {
        await this.allServices.presentToast('Error al añadir Cliente', 'danger');
        await this.modalCtrl.dismiss({ success: false });
      }
    }

  }

  cancelar() {
    this.modalCtrl.dismiss();
  }

}
