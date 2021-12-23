import { HotelDataType } from 'api/types';

export const getHotels = async () => {
  const data = await fetch('http://127.0.0.1:8000/hotel', {
    headers: {
      'Content-Type': 'json/application',
    },
  });
  if (data.ok) {
    const parsedData: HotelDataType[] = await data.json();
    return parsedData;
  } else {
    return undefined;
  }
};
