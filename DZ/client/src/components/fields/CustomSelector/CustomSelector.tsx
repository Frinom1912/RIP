import React, { useCallback, useEffect, useState } from 'react';
import { Field } from 'react-final-form';
import Select, {
  ActionMeta,
  MultiValue,
  SingleValue,
  StylesConfig,
} from 'react-select';

import { CustomInputFieldProps, Option } from './CustomSeletor.types';

export const CustomSelector = (
  props: CustomInputFieldProps<Option>,
): JSX.Element => {
  const { required, options, ...inputProps } = props;
  const Styles: StylesConfig<
    Option,
    boolean,
    Record<string, string> & { options: Option[] }
  > = {
    container: (provided) => ({
      ...provided,
      width: 201,
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'white',
    }),
    menuList: (provided) => ({
      ...provided,
      padding: 0,
    }),
    menu: (state) => ({
      width: 199,
      position: 'absolute',
      padding: 0,
      backgroundColor: 'transparent',
      borderRadius: 4,
      zIndex: 10,
      border: `1px solid #c8c8c8`,
    }),
    option: (provided, state) => ({
      ...provided,
      boxShadow: 'none',
      maxWidth: 193,
      fontWeight: 12,
      color: 'white',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      borderRadius: 4,
      cursor: 'pointer',
      border: `1px solid #c8c8c8`,
      backgroundColor: '#181a1b',

      ':hover': {
        backgroundColor: '#43484b',
      },
    }),
    dropdownIndicator: (provided, state) => ({
      transition: 'transform 1s ease',
      transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'none',
      width: 20,
      height: 20,
    }),
    control: (provided, state) => ({
      ...provided,
      width: 203,
      height: 33,
      padding: 0,
      backgroundColor: 'transparent',
      borderRadius: 16,
      boxShadow: 'none',
      cursor: state.selectProps.menuIsOpen ? 'text' : 'pointer',
      border: `1px solid #c8c8c8`,
      ':hover': {
        border: `1px solid #c8c8c8`,
      },
    }),
    input: (provided) => ({
      ...provided,
      width: 156,
      fontWeight: 12,
      color: 'white',
    }),
    placeholder: (provided) => ({
      ...provided,
      fontWeight: 12,
      color: '#bfbfbf',
    }),
  };

  const [currentValue, setValue] = useState<Option>();

  useEffect(() => {
    setValue(inputProps.initialValue);
  }, [inputProps.initialValue]);

  return (
    <Field<Option> {...inputProps}>
      {({ input: { onChange, onFocus, onBlur } }) => {
        const handleChange = useCallback(
          (
            newValue: SingleValue<Option> | MultiValue<Option>,
            actionMeta: ActionMeta<Option>,
          ) => {
            onChange(newValue as Option);
            setValue(newValue as Option);
          },
          [],
        );
        return (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Select
              styles={Styles}
              onChange={handleChange}
              isSearchable
              isClearable
              onFocus={onFocus}
              onBlur={onBlur}
              maxMenuHeight={120}
              placeholder={props.placeholder}
              options={options}
              {...inputProps}
              value={currentValue}
            />
          </div>
        );
      }}
    </Field>
  );
};
