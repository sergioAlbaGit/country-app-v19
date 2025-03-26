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
      borders:    item.borders?.join(' - ') ?? 'No tiene paises colindantes',
      timezones:  item.timezones.join(' - '),
      continents: item.continents.join(' - '),
      region:     item.region,
      subregion:  item.subregion

    }
  }

  static mapRestCountryToCountryArray(items: RESTCountry[]): Country[]{
    return items.map(this.mapRestCountryToCountry)
  }

}
