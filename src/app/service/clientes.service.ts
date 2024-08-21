import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private URL = environment.URL;

  constructor(
    private http: HttpClient) { }

  addCliente(cliente: any) {
    return this.http.post<any>(this.URL + '/addCliente', cliente)
  }
  deleteCliente(idCliente: any) {
    return this.http.delete(this.URL + `/deleteCliente/${idCliente}`)
  }

  editCliente(data: any, idCliente: number) {
    return this.http.put<any>(this.URL + `/editCliente/${idCliente}`, data)
  }

  listClientes(): Observable<any> {
    return this.http.get<any[]>(this.URL + '/listClientes')
  }
}
