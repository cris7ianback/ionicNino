import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ComprasService {


  private URL = environment.URL;

  constructor(
    private http: HttpClient) { }



  addCompras(compras: any) {
    return this.http.post<any>(this.URL + '/addCompras', compras)
  }

  deleteCompra(idCompra: any) {
    return this.http.delete(this.URL + `/deleteCompra/${idCompra}`)
  }


  listCompras(): Observable<any> {
    return this.http.get<any[]>(this.URL + '/listCompras')
  }
  listComprasCliente(idCliente: any): Observable<any> {
    return this.http.get(this.URL + `/listComprasCliente/${idCliente}`)
  }

  valorPendiente(idCliente: any): Observable<any> {
    return this.http.get(this.URL + `/valorPendiente/${idCliente}`)
  }

  pagado(data: any, idCliente: number) {
    return this.http.put<any>(this.URL + `/updateUsuario/${idCliente}`, data)
  }

  valorPendienteTotal(): Observable<any> {
    return this.http.get<any[]>(this.URL + '/pagoTotalPendiente')
  }


  pagarProducto(idCompra: any, data: any) {
    return this.http.put<any>(this.URL + `/pagarProducto/${idCompra}`, data)
  }

  pagarTodo(idCliente: any, state: any) {
    return this.http.put<any>(this.URL + `/pagarTodo/${idCliente}`, state)
  }


  cryptoData() {
    return this.http.get(this.URL).toPromise().then((data) => {
      return data;
    });
  }

}
