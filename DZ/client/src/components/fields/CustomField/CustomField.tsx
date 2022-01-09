import React from 'react';
import { Field } from 'react-final-form';

import { CustomInput, ErrorMessage } from './CustomField.styles';
import { CustomInputFieldProps } from './CustomField.types';

export const CustomField = <T extends string | number>(
  props: CustomInputFieldProps<T>,
): JSX.Element => {
  const { required, ...inputProps } = props;
  return (
    <Field<T> {...inputProps}>
      {({ input: { value, onChange, onFocus, onBlur }, meta: { touched } }) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <CustomInput
            value={value}
            onInput={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            {...inputProps}
          />
          {required && !value && touched && (
            <ErrorMessage>Обязательное поле</ErrorMessage>
          )}
        </div>
      )}
    </Field>
  );
};
