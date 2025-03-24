import { Component, input } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { isEmpty } from 'rxjs';

@Component({
  selector: 'country-list',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './country-list.component.html'
})
export class CountryListComponent {

  countries = input.required<Country[]>()

  errorMessage = input<string | unknown | null>()
  isLoadingg = input<boolean>(false)
  isEmpty = input<boolean>(false)

}
