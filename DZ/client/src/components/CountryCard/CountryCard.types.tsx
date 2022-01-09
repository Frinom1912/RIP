import { CountryDataType } from 'api/types';

export type CountryCardProps = {
  data: CountryDataType;
  onRemove?: () => void;
  detailed?: boolean;
};
