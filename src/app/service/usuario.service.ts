import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


const USER_KEY = 'auth-user';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private URL = environment.URL;
  // private _usuario!: Users;

  constructor(private http: HttpClient) { }

  // FUNCIONANDO --IMPLEMENTANDO
  listUsuarios(): Observable<any> {
    return this.http.get<any[]>(this.URL + '/listUsuarios')
  }


  addUsuario(usuario: any): Observable<any> {
    return this.http.post<any[]>(this.URL + '/addUsuario', usuario)
  }


  deleteUsuario(idUser: any) {
    return this.http.delete(this.URL + `/deleteUsuario/${idUser}`);
  }



  //MODIFICAR POR EL LADO DEL ADMIN LA PASS DEL USUARIO
  changePassword(data: any, idUser: any) {
    return this.http.put<any>(this.URL + `/changePassword/${idUser}`, data)

  }


  getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {

      return JSON.parse(user);
    }
    return {};
  }

  editUsuario(data: any, idUser: number) {
    return this.http.put<any>(this.URL + `/editUsuario/${idUser}`, data);
  }



  // USUARIO CAMBIA SU PROPIA PASSWORD
  changePass(data: string, rut: string) {
    return this.http.put<any>(this.URL + `/changePass/${rut}`, data);
  }

  isUserData() {
    return this.http.get<any>(this.URL + '/isUserData');
  }

}
