import { HotelDataType } from 'api/types';

export const updateHotelById = async (
  id: number,
  values: Partial<HotelDataType>,
) => {
  const body = new FormData();
  for (const [key, value] of Object.entries(values)) {
    body.append(key, value.toString());
  }
  const data = await fetch(`http://127.0.0.1:8000/hotel/${id}`, {
    method: 'PUT',
    body: body,
  });
  if (data.ok) {
    return true;
  } else {
    return false;
  }
};
