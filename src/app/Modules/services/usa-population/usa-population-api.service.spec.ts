import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsaPopulationApiService } from './usa-population-api.service';

describe('PopulationDataService', () => {
  let service: UsaPopulationApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsaPopulationApiService],
    });
    service = TestBed.inject(UsaPopulationApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding HTTP requests
  });

  it('should fetch population data successfully', () => {
    const mockData = {
      "data": [
        {
          "ID State": "04000US01",
          "State": "Alabama",
          "ID Year": 2020,
          "Year": "2020",
          "Population": 4893186,
          "Slug State": "alabama"
        },
        {
          "ID State": "04000US02",
          "State": "Alaska",
          "ID Year": 2020,
          "Year": "2020",
          "Population": 736990,
          "Slug State": "alaska"
        }],
        source: []
    };

    service.getPopulation().subscribe(data => {
      expect(data.data).toEqual(mockData.data);
    });

    const req = httpMock.expectOne('https://datausa.io/api/data?drilldowns=State&measures=Population');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should handle errors correctly', () => {
    service.getPopulation().subscribe(data => {
      expect(data.data).toEqual([]);
    });

    const req = httpMock.expectOne('https://datausa.io/api/data?drilldowns=State&measures=Population');
    req.error(new ErrorEvent('Network error'));
  });
});