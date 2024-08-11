import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { UsuarioService } from 'src/app/service/usuario.service';
import { AddUsuariosPage } from '../add-usuarios/add-usuarios.page';

@Component({
  selector: 'app-list-usuarios',
  templateUrl: './list-usuarios.page.html',
  styleUrls: ['./list-usuarios.page.scss'],
})
export class ListUsuariosPage implements OnInit {

  // usuarios: any;
  usuarios: any[] = [];
  loading?: HTMLIonLoadingElement;
  textoBuscar: string = ''

  constructor(
    private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private usuariosService: UsuarioService,
  ) { }

  ngOnInit() {
    this.loadData();
  }

  async getUsuarios(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.usuariosService.listUsuarios().subscribe((usuarios: any) => {
        this.usuarios = usuarios;
        resolve();
      }, (error) => {
        reject(error)
      })
    })
  }

  async loadData() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      spinner: 'crescent'
    });

    await loading.present();

    try {
      await Promise.all([
        this.getUsuarios()
      ])
    } catch (error) {
      console.error('Error al cargar la data', error);
    } finally {
      await loading.dismiss();
    }
  }

  onSearchChange(event: any) {
    this.textoBuscar = event.detail.value;
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
    // }

  }


  async presentActionSheet(usuario: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      buttons: [
        {
          text: 'Editar',
          icon: 'create',
          handler: () => {
            // Implementar la lógica para editar el usuario
            console.log('Editar usuario', usuario);
            // this.editUsuario(usuario);
          }
        },
        {
          text: 'Eliminar',
          icon: 'trash',
          role: 'destructive',
          handler: () => {
            this.deleteUsuario(usuario),
              console.log('Eliminar usuario', usuario);
            // this.deleteUsuario(usuario);
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

  async presentToast(message: string, color: 'success' | 'danger' | 'warning') {
    const toast = await this.toastCtrl.create({
      message, duration: 2000, color,
    });
    await toast.present();
  }


}
