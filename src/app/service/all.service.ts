import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AllServices {

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
  ) { }

  async presentToast(message: string, color: 'success' | 'danger' | 'warning') {
    const toast = await this.toastCtrl.create({ message, duration: 2000, color });
    await toast.present();
  }

  async refreshData(loadData: () => Promise<void>, event: any): Promise<void> {
    try {
      await loadData();
    } catch (error) {
      console.error('Error al refrescar los datos', error);
    } finally {
      event.target.complete();
    }
  }

}
