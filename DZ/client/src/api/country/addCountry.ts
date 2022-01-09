import { CountryDataType } from 'api/types';

export const addCountry = async (values: Partial<CountryDataType>) => {
  const body = new FormData();
  for (const [key, value] of Object.entries(values)) {
    body.append(key, value.toString());
  }
  const data = await fetch('http://127.0.0.1:8000/country/', {
    method: 'POST',
    body: body,
  });
  if (data.ok) {
    return true;
  } else {
    return false;
  }
};
