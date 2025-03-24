import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { of } from 'rxjs';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html'
})
export class ByCapitalPageComponent {

  countryService = inject(CountryService)
  query = signal('');

  countryResource = rxResource({
    request: () => ({query: this.query()}),
    loader: ({ request }) => {
      if (  !request.query ) return of([]) ;

      return this.countryService.searchByCaptital(request.query)
    }
  })

  // countryResource = resource({
  //   request: () => ({query: this.query()}),
  //   loader: async({ request }) => {
  //     if (  !request.query ) return [];
  //     return await firstValueFrom(
  //       this.countryService.searchByCaptital(request.query)
  //     )
  //   }
  // })

  // isLoading = signal(false)
  // isError = signal<string | null >(null)
  // countries = signal<Country[]>([])



  // onSearch(query:string){
  //   if ( this.isLoading() ) return;

  //   this.isLoading.set(true);
  //   this.isError.set(null);

  //   this.countryService.searchByCaptital(query).subscribe( {
  //     next: ( countries ) => {
  //       this.isLoading.set(false);
  //       this.countries.set(countries);
  //     },
  //     error: ( err ) => {
  //       console.log(err)
  //       this.isLoading.set(false);
  //       this.countries.set([]);
  //       this.isError.set(err)
  //     }
  //   })
  // }


}
