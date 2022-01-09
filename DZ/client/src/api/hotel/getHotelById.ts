import { HotelDataType } from 'api/types';

export const getHotelById = async (id: number) => {
  const data = await fetch(`http://127.0.0.1:8000/hotel/${id}`, {
    headers: {
      'Content-Type': 'json/application',
    },
  });
  if (data.ok) {
    const parsedData: HotelDataType = await data.json();
    return parsedData;
  } else {
    return undefined;
  }
};
