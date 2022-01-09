import React, { ChangeEvent, useCallback } from 'react';
import { Field, Form } from 'react-final-form';
import { URLSearchParamsInit } from 'react-router-dom';
import { getHotels } from 'api';
import { HotelDataType } from 'api/types';

import { Button } from 'components/Button';
import { CustomInput } from 'components/fields/CustomField/CustomField.styles';
import { StyledLink } from 'components/StyledLink/StyledLink.style';

import { NavbarWrapper } from './Navbar.styles';

export type NavbarProps = {
  detailed?: boolean;
  onChange?: (
    nextInit: URLSearchParamsInit,
    navigateOptions?:
      | {
          replace?: boolean | undefined;
          state?: any;
        }
      | undefined,
  ) => void;
};

export const Navbar = ({ detailed, onChange }: NavbarProps) => {
  const onFilter = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange({ hotelName: event.target.value });
  }, []);

  return (
    <NavbarWrapper>
      <StyledLink to="/hotel">
        <Button>Home</Button>
      </StyledLink>
      <StyledLink to="/country">
        <Button>Countries</Button>
      </StyledLink>
      <StyledLink to="/hotel/add">
        <Button>Add hotel</Button>
      </StyledLink>
      <StyledLink to="/country/add">
        <Button>Add country</Button>
      </StyledLink>
      {detailed && (
        <div style={{ display: 'flex', justifyContent: 'center ' }}>
          <Form
            onSubmit={() => {
              //
            }}
            render={() => (
              <Field name="name">
                {({ input }) => (
                  <CustomInput
                    {...input}
                    placeholder="Найти"
                    onChange={(e) => {
                      input.onChange(e);
                      onFilter(e);
                    }}
                  />
                )}
              </Field>
            )}
          />
        </div>
      )}
    </NavbarWrapper>
  );
};
