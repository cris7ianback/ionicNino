import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.page.html',
  styleUrls: ['./confirm-delete.page.scss'],
})
export class ConfirmDeletePage {
  productId: string;
  constructor(
    private modalController: ModalController,
    private navParams: NavParams
  ) {
    this.productId = this.navParams.get('productId');
  }


  dismiss() {
    this.modalController.dismiss();
  }

}
