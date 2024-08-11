import { Component, OnInit, ViewChild } from '@angular/core';

import HC_more from 'highcharts/highcharts-more';
import * as   Highcharts from 'highcharts';
import { StatsService } from 'src/app/service/stats.service';
import * as ApexCharts from 'apexcharts';
import { style } from '@angular/animations';
import { StatsMesActualService } from 'src/app/service/statsMesActual.service';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {


  gananciasActual: any;
  inversionActual: any;
  vPendienteTotal: any;
  proyeccion: any;
  limit = 5;
  loading?: HTMLIonLoadingElement;
  productos?: any;
  productosStock: any;

  test: any

  constructor(private statsService: StatsService,
    private statsMesActualService: StatsMesActualService,
    private loadingCtrl: LoadingController) { }


  ngOnInit() {
    this.loadData();

  }


  // statsTotalMes() {

  //   this.statsMesActualService.gananciasMesActual().subscribe((data: any[]) => {

  //     const categories = data.map(item => item.mes); // Obtener las etiquetas del eje x
  //     const values = data.map(item => item.totalMes);

  //     const options = {
  //       chart: {
  //         type: 'bar'
  //       },
  //       grid: {

  //       },
  //       labels: {
  //         style: {
  //           color: 'black' // o 'white'
  //         }
  //       },

  //       dataLabels: {
  //         style: {
  //           colors: ['#fff']
  //         }
  //       },
  //       markers: {
  //         colors: ['#F44336', '#E91E63', '#9C27B0']
  //       },
  //       series: [{
  //         name: 'Ventas',
  //         data: values
  //       }],
  //       xaxis: {
  //         categories: categories,
  //         style: {
  //           color:
  //             ['#FFFF']
  //         }
  //       },
  //       dropShadow: {
  //         enabled: true,
  //         top: 0,
  //         left: 0,
  //         blur: 3,
  //         opacity: 0.5
  //       }
  //     };

  //     const chart = new ApexCharts(document.querySelector("#chart"), options);
  //     chart.render();
  //   })



  // }


  // productosVendidos() {

  //   this.statsService.productosVendidos().subscribe((data: any[]) => {
  //     const categories = data.map(item => item.Producto); // Obtener las etiquetas del eje x
  //     const values = data.map(item => item.cantidadVendida);

  //     const options = {
  //       chart: {
  //         type: 'bar'
  //       },
  //       grid: {

  //       },
  //       labels: {
  //         style: {
  //           color: 'black' // o 'white'
  //         }
  //       },

  //       dataLabels: {
  //         style: {
  //           colors: ['#fff']
  //         }
  //       },
  //       markers: {
  //         colors: ['#F44336', '#E91E63', '#9C27B0']
  //       },
  //       series: [{
  //         name: 'Ventas',
  //         data: values
  //       }],
  //       xaxis: {
  //         categories: categories,
  //         style: {
  //           color:
  //             ['#FFFF']
  //         }
  //       },
  //       dropShadow: {
  //         enabled: true,
  //         top: 0,
  //         left: 0,
  //         blur: 3,
  //         opacity: 0.5
  //       }
  //     };

  //     const chart = new ApexCharts(document.querySelector("#chart2"), options);
  //     chart.render();
  //   })



  // }

  // ventasDiarias() {

  //   this.statsService.ventasDiarias().subscribe((data: any[]) => {
  //     const categories = data.map(item => item.ventas); // Obtener las etiquetas del eje x
  //     const values = data.map(item => item.fecha);

  //     const options = {
  //       chart: {
  //         type: 'area'
  //       },
  //       grid: {

  //       },
  //       labels: {
  //         style: {
  //           color: 'black' // o 'white'
  //         }
  //       },

  //       dataLabels: {
  //         style: {
  //           colors: ['#fff']
  //         }
  //       },
  //       markers: {
  //         colors: ['#F44336', '#E91E63', '#9C27B0']
  //       },
  //       series: [{
  //         name: 'Ventas',
  //         data: values
  //       }],
  //       xaxis: {
  //         categories: categories,
  //         style: {
  //           color:
  //             ['#FFFF']
  //         }
  //       },
  //       dropShadow: {
  //         enabled: true,
  //         top: 0,
  //         left: 0,
  //         blur: 3,
  //         opacity: 0.5
  //       }
  //     };

  //     const chart = new ApexCharts(document.querySelector("#chart3"), options);
  //     chart.render();
  //   })



  // }

  // ======================================= INVERSIÓN MES ACTUAL ========================================

  async loadData() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      spinner: 'crescent',
    });

    await loading.present();

    try {
      await Promise.all([
        this.gananciasMesActual(),
        this.inversionMesActual(),
        this.valorPendienteTotal(),
        this.proyeccionVentas(),
        this.stock(),
      ])
    } catch (error) {
      console.error('Error al cargar la data', error);
    } finally {
      await loading.dismiss();
    }

  }

  async gananciasMesActual(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.statsMesActualService.gananciasMesActual().subscribe((res: any) => {
        this.gananciasActual = res.map((e: any) => (e.total_valor));
        resolve();
      }, (error) => {
        reject(error)
      })
    })



  }

  async inversionMesActual(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.statsMesActualService.inversionMesActual().subscribe((res: any) => {
        this.inversionActual = res.map((e: any) => (e.total_valor));
        resolve();
      }, (error) => {
        reject(error)
      })
    })
  }

  async proyeccionVentas(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.statsService.proyeccionVentas().subscribe((res: any) => {
        this.proyeccion = res;
        resolve();
      }, (error) => {
        reject(error)
      })
    })
  }

  async stock(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.statsService.stock().subscribe((res: any) => {
        this.productosStock = res;
        resolve();
      }, (error) => {
        reject(error);
      })
    })
  }

  async valorPendienteTotal(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.statsService.valorPendienteTotal().subscribe((res: any) => {
        this.vPendienteTotal = res;
        resolve();
      }, (error) => {
        reject(error);
      })
    })
  }

}
