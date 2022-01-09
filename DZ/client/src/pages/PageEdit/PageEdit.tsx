import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Form } from 'react-final-form';
import { TailSpin } from 'react-loader-spinner';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { getHotelById, updateHotelById } from 'api';
import { getCountries } from 'api/country';
import { HotelDataType } from 'api/types';

import { Button } from 'components/Button';
import { CustomField } from 'components/fields/CustomField';
import { CustomSelector } from 'components/fields/CustomSelector';
import { Option } from 'components/fields/CustomSelector/CustomSeletor.types';
import { Navbar } from 'components/Navbar/Navbar';
import { StyledForm } from 'components/StyledForm/StyledForm.styles';
import { sleep } from 'utils/sleep';

import { InputWrapper } from './PageEdit.styles';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export const PageEdit = () => {
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState<Option[] | undefined>(undefined);
  const [initialValue, setInitialValue] = useState<
    | Record<string, string | number | Record<string, number | string>>
    | undefined
  >(undefined);

  const initialCountry = useMemo(
    () => initialValue?.country as Option,
    [initialValue],
  );

  const initialStars = useMemo(
    () => initialValue?.stars as Option,
    [initialValue],
  );

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    getCountries().then(async (values) => {
      if (values) {
        await sleep(200);
        const options = values.map((val) => ({
          value: val.pk,
          label: val.name,
        }));
        setCountries(options);

        getHotelById(parseInt(id || '0')).then(async (data) => {
          if (data) {
            await sleep(200);
            const formData = data as Record<
              string,
              string | number | Record<string, number | string>
            >;
            formData['stars'] = {
              value: data?.stars,
              label: '☆'.repeat(data?.stars),
            } as Option;
            formData['country'] = {
              value: data.country?.pk || -1,
              label: data.country?.name || '',
            };
            setInitialValue(formData);
          }
        });
      }
      setLoading(false);
    });
  }, [id]);

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

      return updateHotelById(parseInt(id || '0'), newValues).then(
        async (value) => {
          if (value) {
            await sleep(2000);
          } else {
            console.error('Error while PUT hotel fetch');
          }
          setLoading(false);
          navigate('/');
        },
      );
    },
    [],
  );

  return (
    <>
      <Navbar />
      <Form
        onSubmit={onSubmit}
        initialValues={initialValue}
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
                  initialValue={initialStars}
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
                  options={countries}
                  initialValue={initialCountry}
                />
              </InputWrapper>
              <Button type="submit" disabled={submitting}>
                Обновить
              </Button>
            </StyledForm>
          )
        }
      />
    </>
  );
};
