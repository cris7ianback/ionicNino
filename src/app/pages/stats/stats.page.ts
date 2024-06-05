import { Component, OnInit, ViewChild } from '@angular/core';

import HC_more from 'highcharts/highcharts-more';
import * as   Highcharts from 'highcharts';
import { StatsService } from 'src/app/service/stats.service';
import * as ApexCharts from 'apexcharts';
import { style } from '@angular/animations';


@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {




  test: any

  constructor(private statsService: StatsService,) { }




  ngOnInit() {
    // this.statsTotalMes();
    this.statsTotalMes();
    this.productosVendidos();
    this.ventasDiarias();



  }



  statsTotalMes() {

    this.statsService.statsTotalMes().subscribe((data: any[]) => {

      const categories = data.map(item => item.mes); // Obtener las etiquetas del eje x
      const values = data.map(item => item.totalMes);

      const options = {
        chart: {
          type: 'bar'
        },
        grid: {

        },
        labels: {
          style: {
            color: 'black' // o 'white'
          }
        },

        dataLabels: {
          style: {
            colors: ['#fff']
          }
        },
        markers: {
          colors: ['#F44336', '#E91E63', '#9C27B0']
        },
        series: [{
          name: 'Ventas',
          data: values
        }],
        xaxis: {
          categories: categories,
          style: {
            color:
              ['#FFFF']
          }
        },
        dropShadow: {
          enabled: true,
          top: 0,
          left: 0,
          blur: 3,
          opacity: 0.5
        }
      };

      const chart = new ApexCharts(document.querySelector("#chart"), options);
      chart.render();
    })



  }


  productosVendidos() {

    this.statsService.productosVendidos().subscribe((data: any[]) => {
      console.log(data)

      const categories = data.map(item => item.Producto); // Obtener las etiquetas del eje x
      const values = data.map(item => item.cantidadVendida);

      const options = {
        chart: {
          type: 'bar'
        },
        grid: {

        },
        labels: {
          style: {
            color: 'black' // o 'white'
          }
        },

        dataLabels: {
          style: {
            colors: ['#fff']
          }
        },
        markers: {
          colors: ['#F44336', '#E91E63', '#9C27B0']
        },
        series: [{
          name: 'Ventas',
          data: values
        }],
        xaxis: {
          categories: categories,
          style: {
            color:
              ['#FFFF']
          }
        },
        dropShadow: {
          enabled: true,
          top: 0,
          left: 0,
          blur: 3,
          opacity: 0.5
        }
      };

      const chart = new ApexCharts(document.querySelector("#chart2"), options);
      chart.render();
    })



  }

  ventasDiarias() {

    this.statsService.ventasDiarias().subscribe((data: any[]) => {
      console.log(data)

      const categories = data.map(item => item.ventas); // Obtener las etiquetas del eje x
      const values = data.map(item => item.fecha);

      const options = {
        chart: {
          type: 'area'
        },
        grid: {

        },
        labels: {
          style: {
            color: 'black' // o 'white'
          }
        },

        dataLabels: {
          style: {
            colors: ['#fff']
          }
        },
        markers: {
          colors: ['#F44336', '#E91E63', '#9C27B0']
        },
        series: [{
          name: 'Ventas',
          data: values
        }],
        xaxis: {
          categories: categories,
          style: {
            color:
              ['#FFFF']
          }
        },
        dropShadow: {
          enabled: true,
          top: 0,
          left: 0,
          blur: 3,
          opacity: 0.5
        }
      };

      const chart = new ApexCharts(document.querySelector("#chart3"), options);
      chart.render();
    })



  }



}
