import { Component, Input } from '@angular/core';
import * as Highcharts from 'highcharts'

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.sass'],
})
export class ChartComponent {
  readonly chartType = 'line';
  @Input() set series(chartData: []) {
    this.handleUpdate(chartData);
  }
  readonly startYear: number =  2015;
  readonly endYear: number = 2020;

  generateXAxys(): any {
    const xAxysLabels: any[] = [];
    for (let index: any = this.startYear; index <= this.endYear; index++) {
      xAxysLabels.push(index)
    }

    return xAxysLabels;
  }

  Highcharts: typeof Highcharts = Highcharts;
  updateFlag = false;

  chartOptions: Highcharts.Options = {
    title: {
      text: '',
    },
    yAxis: {
      title: {
        text: 'Population'
      }
    },
    xAxis: {
      title: {
        text: 'Years'
      },
      accessibility: {
        rangeDescription: 'Range: 2015 to 2020'
      },
      categories: this.generateXAxys()
    },
    series: [],
  };

  handleUpdate(chartData: []) {
    for(const state in chartData){
      this.chartOptions.series?.push({
        type: this.chartType,
        name: state,
        data: chartData[state]['data']
      })
    }
    this.updateFlag = true;
  }
}
