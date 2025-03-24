import { Country } from "../interfaces/country.interface";
import { RESTCountry } from '../interfaces/rest-countries.interfaces';

export class CountryMapper {

  static mapRestCountryToCountry(item: RESTCountry): Country{
    return {
      capital:    item.capital.join(','),
      cca2:       item.cca2,
      flag:       item.flag,
      flagSvg:    item.flags.svg,
      name:       item.translations['spa'].common ?? 'No spanish name',
      population: item.population,

    }
  }

  static mapRestCountryToCountryArray(items: RESTCountry[]): Country[]{
    return items.map(this.mapRestCountryToCountry)
  }

}
