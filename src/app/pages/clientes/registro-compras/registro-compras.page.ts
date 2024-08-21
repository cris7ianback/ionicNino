import { ComprasService } from './../../../service/compras.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { AddCompraPage } from '../add-compra/add-compra.page';

@Component({
  selector: 'app-registro-compras',
  templateUrl: './registro-compras.page.html',
  styleUrls: ['./registro-compras.page.scss'],
})
export class RegistroComprasPage implements OnInit {
  idCliente?: any;
  consumo: any;
  loading?: HTMLIonLoadingElement;
  isLoading: boolean = true;
  constructor(
    private comprasService: ComprasService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private toastCtrl: ToastController) {

    this.idCliente = this.route.snapshot.paramMap.get('idCliente');
  }

  ngOnInit() {
    this.loadData();
  }

  async addCompra() {
    const modal = await this.modalCtrl.create({
      component: AddCompraPage
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data && data.success) {
      await this.loadData();
    }
  }

  async getConsumo(): Promise<void> {

    try {
      this.comprasService.listComprasCliente(this.idCliente).subscribe(data => {
        this.consumo = data;
        this.presentToast('Información Cargada', 'success')
      });
    } catch (error) {
      console.log('Error al cargar Información', error);
      await this.presentToast('Error al cargar información', 'danger')
    }


  }

  async loadData() {
    this.loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      spinner: 'crescent'
    });
    await this.loading.present();

    try {
      await this.getConsumo();
    } finally {
      await this.loading.dismiss();
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

  pagarTodo(idCliente: string, state: any): void {
    this.isLoading = true;
    state = 'pagado'
    this.comprasService.pagarTodo(idCliente, state).subscribe((res: any) => {

    })
  }

}



