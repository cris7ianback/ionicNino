import { Component, OnInit, ViewChild } from '@angular/core';

import HC_more from 'highcharts/highcharts-more';
import * as   Highcharts from 'highcharts';
import { StatsService } from 'src/app/service/stats.service';
import * as ApexCharts from 'apexcharts';


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



  }



  statsTotalMes() {

    this.statsService.statsTotalMes().subscribe((data: any[]) => {

      const categories = data.map(item => item.mes); // Obtener las etiquetas del eje x
      const values = data.map(item => item.totalMes);

      const options = {
        chart: {
          type: 'bar'
        },
        dataLabels: {
          style: {
            colors: ['white']
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
          categories: categories
        }
      };

      const chart = new ApexCharts(document.querySelector("#chart"), options);
      chart.render();
    })



  }

}
