import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { map, Observable, catchError, throwError, delay, of, tap } from 'rxjs';
import type { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { Region } from '../interfaces/region.type';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {


  private http = inject(HttpClient)
  private queryCacheCapital = new Map<string, Country[]>()
  private queryCacheCountry = new Map<string, Country[]>()
  private queryCacheRegion = new Map<Region, Country[]>()

  searchByCapital( query: string ): Observable<Country[]>{
    console.log(this.queryCacheCapital)
    query = query.toLowerCase();

    if( this.queryCacheCapital.has(query)){
      return of( this.queryCacheCapital.get(query) ?? []
    )}

      console.log(`Llegando al servidor ${query}`)

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
    .pipe(
      map((resp) => CountryMapper.mapRestCountryToCountryArray(resp)),
      tap((countries) => this.queryCacheCapital.set(query, countries)),
      catchError(error => {
        console.log( "Error fetching" ,error);

      return throwError(
        ()=> new Error(`No se pudo obtener paises con ese query: ${query}`)
      )}
    )
    )
  }


  searchByCountry( query: string ): Observable<Country[]>{
    console.log(this.queryCacheCountry)
    query = query.toLowerCase();
    if( this.queryCacheCountry.has(query)){
      return of( this.queryCacheCountry.get(query) ?? []
    )}

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`)
    .pipe(
      map((resp) => CountryMapper.mapRestCountryToCountryArray(resp)),
      tap((countries) =>  this.queryCacheCountry.set(query, countries)),
      delay(1000),
      catchError(error => {
        console.log( "Error fetching" ,error);

      return throwError(
        ()=> new Error(`No se pudo obtener paises con ese query: ${query}`)
      )}
    )
    )
  }


  searchCountryByAlphaCode( code: string ) {
    const URL = `${API_URL}/alpha/${code}`;
    return this.http.get<RESTCountry[]>(URL)
    .pipe(
      map((resp) => CountryMapper.mapRestCountryToCountryArray(resp)),
      map( countries => countries.at(0) ),
      catchError(error => {
        console.log( "Error fetching" ,error);

      return throwError(
        ()=> new Error(`No se pudo obtener paises con ese code: ${code}`)
      )}
    )
    )
  }

  searchByRegion( region: Region ){
    const URL = `${API_URL}/region/${region}`;

    if( this.queryCacheCountry.has(region)){
      return of( this.queryCacheRegion.get(region) ?? []
    )}

    return this.http.get<RESTCountry[]>(URL)
    .pipe(
      map((resp) => CountryMapper.mapRestCountryToCountryArray(resp)),
      tap((countries) =>  this.queryCacheRegion.set(region, countries)),
      catchError(error => {
        console.log( "Error fetching" ,error);

      return throwError(
        ()=> new Error(`No se pudo obtener paises con ese query: ${region}`)
      )}
    )
    )
  }


}
