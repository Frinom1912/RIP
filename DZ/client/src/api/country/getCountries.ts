import { CountryDataType } from 'api/types';

export const getCountries = async () => {
  const data = await fetch('http://127.0.0.1:8000/country', {
    headers: {
      'Content-Type': 'json/application',
    },
  });
  if (data.ok) {
    const parsedData: CountryDataType[] = await data.json();
    return parsedData;
  } else {
    return undefined;
  }
};
