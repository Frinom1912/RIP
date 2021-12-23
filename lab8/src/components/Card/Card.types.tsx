import { HotelDataType } from 'api/types';

export type CardProps = {
  data: HotelDataType;
  onRemove?: () => void;
};
