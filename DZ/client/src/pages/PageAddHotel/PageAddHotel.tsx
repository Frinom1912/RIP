import React, { useCallback, useEffect, useState } from 'react';
import { Form } from 'react-final-form';
import { TailSpin } from 'react-loader-spinner';
import { getCountries } from 'api/country';
import { addHotel } from 'api/hotel';
import { HotelDataType } from 'api/types';

import { Button } from 'components/Button';
import { CustomField } from 'components/fields/CustomField';
import { CustomSelector } from 'components/fields/CustomSelector';
import { Option } from 'components/fields/CustomSelector/CustomSeletor.types';
import { Navbar } from 'components/Navbar/Navbar';
import { StyledForm } from 'components/StyledForm/StyledForm.styles';
import { sleep } from 'utils/sleep';

import { InputWrapper } from './PageAddHotel.styles';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export const PageAddHotel = () => {
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState<Option[] | undefined>(undefined);

  useEffect(() => {
    setLoading(true);

    getCountries().then(async (values) => {
      if (values) {
        await sleep(500);
        const options = values.map((val) => ({
          value: val.pk,
          label: val.name,
        }));
        setCountries(options);
      }
      setLoading(false);
    });
  }, []);

  const onSubmit = useCallback(
    async (
      values: Record<string, string | Record<string, string | number>>,
    ) => {
      setLoading(true);

      if (!values['name']) {
        return { error: 'error' };
      }

      const stars = values['stars'] as Record<string, number>;
      const country = values['country'] as Record<string, number>;
      const newValues: Partial<HotelDataType> = {
        ...values,
        stars: stars['value'],
        country_code: country['value'],
      };

      return addHotel(newValues).then(async (value) => {
        if (value) {
          await sleep(2000);
        } else {
          console.error('Error while POST hotel fetch');
        }
        setLoading(false);
      });
    },
    [],
  );

  return (
    <>
      <Navbar />
      <Form
        onSubmit={onSubmit}
        validate={(values) => {
          const errors: Record<string, string> = {};
          if (!values.name) {
            errors.name = 'Required';
          }
          return errors;
        }}
        render={({ submitting, form, handleSubmit }) =>
          loading ? (
            <div style={{ position: 'absolute', top: '50%', left: '50%' }}>
              <TailSpin arialLabel="loading-indicator" />
            </div>
          ) : (
            <StyledForm
              onSubmit={async (event) => {
                await handleSubmit(event);
                form.reset();
              }}
            >
              <InputWrapper>
                <label htmlFor="name">Название</label>
                <CustomField
                  name="name"
                  type="text"
                  component="input"
                  placeholder="Название"
                  required
                />
              </InputWrapper>
              <InputWrapper>
                <label htmlFor="url">Ссылка на отель</label>
                <CustomField
                  name="url"
                  type="text"
                  component="input"
                  placeholder="Ссылка"
                />
              </InputWrapper>
              <InputWrapper>
                <label htmlFor="imageSrc">Ссылка на изображение отеля</label>
                <CustomField
                  name="imageSrc"
                  type="text"
                  component="input"
                  placeholder="Ссылка"
                />
              </InputWrapper>
              <InputWrapper>
                <label htmlFor="stars">Количество звезд</label>
                <CustomSelector
                  name="stars"
                  placeholder="Выберите..."
                  options={[
                    { value: 1, label: '☆' },
                    { value: 2, label: '☆☆' },
                    { value: 3, label: '☆☆☆' },
                    { value: 4, label: '☆☆☆☆' },
                    { value: 5, label: '☆☆☆☆☆' },
                  ]}
                />
              </InputWrapper>
              <InputWrapper>
                <label htmlFor="country">Страна</label>
                <CustomSelector
                  name="country"
                  placeholder="Выберите..."
                  component="input"
                  options={countries}
                />
              </InputWrapper>
              <Button type="submit" disabled={submitting}>
                Добавить
              </Button>
            </StyledForm>
          )
        }
      />
    </>
  );
};
