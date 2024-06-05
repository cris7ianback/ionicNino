import { Injectable } from '@angular/core';


const USER_KEY = 'auth-user';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor() { }

  getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {

      return JSON.parse(user);
    }
    return {};
  }
}
