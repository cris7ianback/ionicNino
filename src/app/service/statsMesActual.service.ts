import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';




@Injectable({
    providedIn: 'root'
})
export class StatsMesActualService {

    private URL = environment.URL;

    constructor(private http: HttpClient) { }

    // valorPendienteTotal(): Observable<any> {
    //     return this.http.get<Compras[]>(this.URL + '/pagoTotalPendiente')
    // }

    // productosVendidos(): Observable<any> {
    //     return this.http.get<any[]>(this.URL + '/productosVendidos')
    // }


    gananciasMesActual(): Observable<any> {
        return this.http.get<any[]>(this.URL + '/gananciasMesActual');
    }

    inversionMesActual(): Observable<any> {
        return this.http.get<any[]>(this.URL + '/inversionMesActual');
    }

    // gastoVsIngresos(): Observable<any> {
    //     return this.http.get<any[]>(this.URL + '/gastoVsIngresos')
    // }

    // proyeccionVentas(): Observable<any> {
    //     return this.http.get<any[]>(this.URL + '/proyeccionVentas')
    // }

    // ventasDiarias(): Observable<any> {
    //     return this.http.get<any[]>(this.URL + '/ventasDiarias')
    // }

    // stock(): Observable<any> {
    //     return this.http.get<any[]>(this.URL + '/stock')
    // }

    // inversion(): Observable<any> {
    //     return this.http.get<any[]>(this.URL + '/inversion')
    // }

    // porcentaje(): Observable<any> {
    //     return this.http.get<any[]>(this.URL + '/porcentaje')
    // }

    // ventasXclientes(): Observable<any> {
    //     return this.http.get<any[]>(this.URL + '/ventasXclientes')
    // }

    // // MES

    // inversionMensual(): Observable<any> {
    //     return this.http.get<any[]>(this.URL + `/inversionMensual`)
    // }


}

