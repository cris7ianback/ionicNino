import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  estado?: boolean;
  private data = [];
  getChartDataEvent: any;
  auditoria: any;
  usuario: any;
  token: any;
  private URL: string = environment.URL;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }


  getToken() {
    return localStorage.getItem('item');
  }

  isRolId() {
    return this.http.get<any>(this.URL + '/isRolId');
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  login(usuario: any) {
    return this.http.post<any>(this.URL + '/login', usuario);
  }

  //Usuario
  isUserData() {
    return this.http.get<any>(this.URL + '/isUserData');
  }

  // logout() {

  //   this.audit.insertAudit(this.auditoria).subscribe((res: any) => {

  //   })

  //   this.auditoria = {
  //     usuario: this.usuario,
  //     modulo: 'Logout',
  //     accion: `Cierre de Sesión, usuario: ${this.usuario}`
  //   }

  //   this.dialogService.openConfirmDialog('¿Está seguro de Cerrar Sesión?').afterClosed().subscribe((res: any) => {
  //     if (res) {
  //       this.http.get<any>(this.URL + '/logout').subscribe(
  //         (res: any) => { },
  //         (err: any) => {
  //           this.audit.insertAudit(this.auditoria).subscribe((res: any) => {
  //           })


  //           this.toast.success({
  //             detail: 'Sesión Finalizada',
  //             summary: 'Usuario deslogueado.',
  //             duration: 3000,
  //             position: 'bottomRight',
  //           });
  //           localStorage.removeItem('token');
  //           sessionStorage.removeItem('home');
  //           return this.router.navigate(['/login']);
  //         }
  //       );
  //     }
  //   });
  // }

  // public getChartData() {
  //   const self = this;

  //   self.data = [];

  //   setTimeout(() => {
  //     self.getChartDataEvent.next(self.data);
  //   }, 2000);
  // }

  public getChartData() {
    const self = this;

    self.data = [];

    setTimeout(() => {
      self.getChartDataEvent.next(self.data);
    }, 2000);
  }


}
