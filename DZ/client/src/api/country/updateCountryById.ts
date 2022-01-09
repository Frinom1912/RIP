import { CountryDataType } from 'api/types';

export const updateCountryById = async (
  id: number,
  values: Partial<CountryDataType>,
) => {
  const body = new FormData();
  for (const [key, value] of Object.entries(values)) {
    body.append(key, value.toString());
  }
  const data = await fetch(`http://127.0.0.1:8000/country/${id}`, {
    method: 'PUT',
    body: body,
  });
  if (data.ok) {
    return true;
  } else {
    return false;
  }
};
