import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/service/auth.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  public loginForm!: UntypedFormGroup;
  private key: string = environment.token
  incorrecta!: boolean;

  formBuilder: any;
  isLoggedIn = false;
  roles: string[] = [];
  estado_admin: boolean = false;
  estado_perimetral: boolean = false;
  estado_interna: boolean = false;
  estado_informatica: boolean = false;
  username?: string;
  password?: string;
  auditoria: any;
  usuario: any;
  token: any;
  private CryptoJS: any;

  form: any = {
    username: null,
    password: null
  }
  constructor(
    // private auditService: AuditService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    // private messageService: MessagesService,

  ) {
    this.loginForm = this.fb.group({
      username: ['18033613', [Validators.required, Validators.minLength(3)]],
      password: ['Cris170292!', [Validators.required, Validators.minLength(3)]]
    });


  }

  ngOnInit(): void {

    localStorage.removeItem('rid_ss0');
    sessionStorage.removeItem('home');

    if (this.authService.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.usuarioService.getUser().roles;
    }
  }

  login(): void {




    this.incorrecta = false;
    const { username, password } = this.loginForm.value;

    this.loginForm.value.username = CryptoJS.AES.encrypt(username, 'secret key 123').toString();
    this.loginForm.value.password = CryptoJS.AES.encrypt(password, 'secret key 123').toString();


    this.authService.login(this.loginForm.value).subscribe(
      res => {
 
        this.auditoria = { usuario: this.loginForm.value.username, modulo: 'Login', accion: `Inicio de Sesión` }

        localStorage.setItem('token', res.token);
        this.authService.isRolId().subscribe(
          (res) => {
  

            switch (res.status) {
              case 201:
                this.estado_admin = true;
                this.router.navigate(['/home']);
                // sessionStorage.setItem('home', 'activos');
                // this.messageService.menssageSuccessful('Acceso Administrador', 'Bienvenido Administrador');
                break;

              default:
                // this.messageService.menssageCritical('Error', 'No puede ver este contenido');
                setTimeout(() => {
                  this.router.navigate(['/login']);
                }, 2000);
            }
          },
          (err) => {
            // this.messageService.menssageCritical('Acceso Denegado', 'Error al Acceder');
          }
        );
      },

      // En caso de escribir mal o usuario levanta Error en ventana Principal.
      (serverLoginError: any) => {
        if (serverLoginError.status != 200) {

          // this.messageService.menssageCritical('Acceso Denegado', 'Error de Contraseña o username');
          this.incorrecta = true;
        }
      }
    );

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
  }

  OnResetForm(): void {
    this.loginForm.reset();
  }

  campoEsValido(username: any) {
    return (
      this.loginForm.controls[username].errors &&
      this.loginForm.controls[username].touched
    );
  }

}
