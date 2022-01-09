import { FieldProps, FieldRenderProps } from 'react-final-form';

export type Option = {
  value: number;
  label: string;
};

export type CustomInputFieldProps<T extends Option> = FieldProps<
  T,
  FieldRenderProps<T, HTMLElement, T>,
  HTMLElement,
  T
> &
  Omit<
    FieldProps<T, FieldRenderProps<T, HTMLElement, T>, HTMLElement, T>,
    'children'
  > & {
    required?: boolean;
    options?: Array<Option>;
  };
