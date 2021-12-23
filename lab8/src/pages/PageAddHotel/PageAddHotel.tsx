import React, { useCallback, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { addHotel } from 'api';
import { HotelDataType } from 'api/types';

import { Button } from 'components/Button';
import { Navbar } from 'components/Navbar/Navbar';
import { StyledForm } from 'components/StyledForm/StyledForm.styles';

import { InputWrapper } from './PageAddHotel.styles';

export const PageAddHotel = () => {
  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback((values: Record<string, string>) => {
    setLoading(true);
    const newValues: Partial<HotelDataType> = {
      stars: parseInt(values['stars']),
      country_code: parseInt(values['country_code']),
      ...values,
    };
    addHotel(newValues).then(() => {
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Navbar />
      <Form
        onSubmit={onSubmit}
        render={({ submitting, handleSubmit }) => (
          <StyledForm onSubmit={handleSubmit}>
            <InputWrapper>
              <label>Название</label>
              <Field
                name="name"
                type="text"
                component="input"
                placeholder="Name"
              />
            </InputWrapper>
            <InputWrapper>
              <label>Ссылка на отель</label>
              <Field
                name="url"
                type="text"
                component="input"
                placeholder="Ссылка"
              />
            </InputWrapper>
            <InputWrapper>
              <label>Ссылка на изображение отеля</label>
              <Field
                name="imageSrc"
                type="text"
                component="input"
                placeholder="Ссылка"
              />
            </InputWrapper>
            <InputWrapper>
              <label>Количество звезд</label>
              <Field name="stars" component="select" defaultValue="default">
                <option value="default" disabled>
                  Количество звезд
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Field>
            </InputWrapper>
            <InputWrapper>
              <label>Id страны</label>
              <Field
                name="country_code"
                type="text"
                component="input"
                placeholder="Номер"
              />
            </InputWrapper>
            <Button type="submit" disabled={submitting || loading}>
              Добавить
            </Button>
          </StyledForm>
        )}
      />
    </>
  );
};
