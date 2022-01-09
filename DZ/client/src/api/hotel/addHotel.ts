import { HotelDataType } from 'api/types';

export const addHotel = async (values: Partial<HotelDataType>) => {
  // const newValues: HotelDataType = {
  //   stars: parseInt(values.stars),
  //   country_code: parseInt(values.country_code),
  //   ...values,
  // };
  const body = new FormData();
  for (const [key, value] of Object.entries(values)) {
    body.append(key, value.toString());
  }
  const data = await fetch('http://127.0.0.1:8000/hotel/', {
    method: 'POST',
    body: body,
  });
  if (data.ok) {
    return true;
  } else {
    return false;
  }
};
