import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { UsuarioService } from 'src/app/service/usuario.service';
import { AddUsuariosPage } from '../add-usuarios/add-usuarios.page';
import { EditUsuariosPage } from '../edit-usuarios/edit-usuarios.page';
import { EditPasswordPage } from '../edit-password/edit-password.page';

@Component({
  selector: 'app-list-usuarios',
  templateUrl: './list-usuarios.page.html',
  styleUrls: ['./list-usuarios.page.scss'],
})
export class ListUsuariosPage implements OnInit {

  usuarios: any[] = [];
  loading?: HTMLIonLoadingElement;
  filteredItems: any[] = [];

  constructor(
    private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private usuariosService: UsuarioService) { }

  ngOnInit() {
    this.loadData();
  }

  async getUsuarios(): Promise<void> {
    try {
      const usuarios = await this.usuariosService.listUsuarios().toPromise();
      this.usuarios = usuarios;
      this.filteredItems = [...this.usuarios];
    } catch (error) {
      console.error('Error al cargar los usuarios', error);
      await this.presentToast('Error al cargar los usuarios', 'danger');
    }
  }

  async loadData() {
    this.loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      spinner: 'crescent'
    });
    await this.loading.present();

    try {
      await this.getUsuarios();
    } finally {
      await this.loading.dismiss();
    }
  }

  async addUsuario() {
    const modal = await this.modalCtrl.create({
      component: AddUsuariosPage
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data && data.success) {
      await this.loadData();
    }
  }

  async editUsuario(usuario: any) {
    const modal = await this.modalCtrl.create({
      component: EditUsuariosPage,
      componentProps: { usuario }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data && data.success) {
      await this.loadData();
    }
  }

  async presentActionSheet(usuario: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      buttons: [
        {
          text: 'Editar',
          icon: 'create',
          handler: () => {
            this.editUsuario(usuario);
          }
        },
        {
          text: 'Cambiar Contraseña',
          icon: 'key',
          handler: () => {
            this.changeUserPassword(usuario);
          }
        },
        {
          text: 'Eliminar',
          icon: 'trash',
          role: 'destructive',
          handler: () => {
            this.deleteUsuario(usuario);
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

  async deleteUsuario(usuario: any) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar Eliminación',
      message: `¿Estás seguro de que deseas eliminar al usuario ${usuario.nombre}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Eliminación cancelada');
          }
        },
        {
          text: 'Eliminar',
          handler: async () => {
            try {
              await this.usuariosService.deleteUsuario(usuario.idUser).toPromise();
              await this.presentToast('Usuario eliminado con éxito', 'success');
              await this.loadData();
            } catch (error) {
              console.error('Error al eliminar usuario', error);
              await this.presentToast('Error al eliminar usuario', 'danger');
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async changeUserPassword(usuario: any) {
    const modal = await this.modalCtrl.create({
      component: EditPasswordPage,
      componentProps: { usuarioId: usuario.idUser }  // Pasa el id del usuario
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data && data.success) {
      await this.presentToast('Contraseña cambiada con éxito', 'success');
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

  filterItems(event: any) {
    const searchTerm = event.target.value.toLowerCase();

    this.filteredItems = this.usuarios.filter(item => {
      return item.nombre.toLowerCase().includes(searchTerm) ||
        item.username.toLowerCase().includes(searchTerm);
    });
  }


  async doRefresh(event: any) {
    try {
      await this.loadData();
      event.target.complete();
    } catch (error) {
      console.error('Error al refrescar los datos', error);
      event.target.complete();
    }
  }


}