import { Component } from '@angular/core';
import { UsaPopulationApiService } from '../../services/usa-population/usa-population-api.service';

@Component({
  selector: 'app-population-page',
  templateUrl: './population-page.component.html',
  styleUrls: ['./population-page.component.sass']
})
export class PopulationPageComponent {
  readonly startYear = 2015;
  readonly endYear = 2020;
  formattedPopulationData: any;

  constructor(private usaPopulationApiService: UsaPopulationApiService) {
    usaPopulationApiService.getPopulation()
    .subscribe(populationData => {
      const filteredPopulationData = populationData.data.filter(populationData => {
         return populationData['ID Year'] >= this.startYear && populationData['ID Year'] <= this.endYear
      });
      const chartData: any = [];

      filteredPopulationData.reverse().forEach((item: any) => {
        if (item['ID Year'] >= this.startYear && item['ID Year'] <= this.endYear) {

          if (chartData[item['State']]) {
            chartData[item['State']].data.push(item['Population'])
          } else {
            chartData[item['State']] = {
              data: [item['Population']]
            }
          }
        }
      });
      this.formattedPopulationData = chartData;
    });
  }
}
