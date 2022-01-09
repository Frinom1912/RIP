import { CountryDataType } from './CountryDataType';

export type HotelDataType = {
  pk: number;
  name: string;
  url: string;
  imageSrc: string;
  stars: number;
  country_code: number;
  country?: CountryDataType;
};
