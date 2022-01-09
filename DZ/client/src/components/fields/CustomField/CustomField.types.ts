import { FieldProps, FieldRenderProps } from 'react-final-form';

export type CustomInputFieldProps<T extends string | number> = FieldProps<
  T,
  FieldRenderProps<T, HTMLElement, T>,
  HTMLElement,
  T
> &
  Omit<
    FieldProps<T, FieldRenderProps<T, HTMLElement, T>, HTMLElement, T>,
    'children'
  > & {
    name: string;
    required?: boolean;
  };
