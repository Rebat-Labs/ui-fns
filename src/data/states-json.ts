import { TStateJson } from "../types";
import statesData from "../jsons/states.json";

export const statesJson: TStateJson[] = statesData as TStateJson[];

export function findStatesByCountryCode(countryCode: string): TStateJson[] {
  return statesJson.filter(item => item.country_code === countryCode);
}

export function findStatesByCountryName(countryName: string): TStateJson[] {
  return statesJson.filter(item => item.country_name.toLowerCase() === countryName.toLowerCase());
}

export function findStateByName(stateName: string, countryCode?: string): TStateJson | undefined {
  if (countryCode) {
    return statesJson.find(item => 
      item.name.toLowerCase() === stateName.toLowerCase() && 
      item.country_code === countryCode
    );
  }
  return statesJson.find(item => item.name.toLowerCase() === stateName.toLowerCase());
}

export function findStateByCode(stateCode: string, countryCode?: string): TStateJson | undefined {
  if (countryCode) {
    return statesJson.find(item => 
      item.state_code === stateCode && 
      item.country_code === countryCode
    );
  }
  return statesJson.find(item => item.state_code === stateCode);
}
