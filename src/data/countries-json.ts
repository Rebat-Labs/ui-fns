import { TCountryJson } from "../types";
import countriesData from "../jsons/countries.json";

export const countriesJson: TCountryJson[] = countriesData as TCountryJson[];

export function findCountryJson(code: string): TCountryJson | undefined {
  return countriesJson.find(item => item.iso2 === code);
}

export function findCountryJsonByIso3(code: string): TCountryJson | undefined {
  return countriesJson.find(item => item.iso3 === code);
}

export function findCountryJsonByName(name: string): TCountryJson | undefined {
  return countriesJson.find(item => item.name.toLowerCase() === name.toLowerCase());
}

export function getCountriesByRegion(region: string): TCountryJson[] {
  return countriesJson.filter(item => item.region.toLowerCase() === region.toLowerCase());
}

export function getCountriesBySubregion(subregion: string): TCountryJson[] {
  return countriesJson.filter(item => item.subregion.toLowerCase() === subregion.toLowerCase());
}
