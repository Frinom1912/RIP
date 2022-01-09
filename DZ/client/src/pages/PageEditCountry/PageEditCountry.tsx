import React, { useCallback, useEffect, useState } from 'react';
import { Form } from 'react-final-form';
import { TailSpin } from 'react-loader-spinner';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { getCountryById, updateCountryById } from 'api';

import { Button } from 'components/Button';
import { CustomField } from 'components/fields/CustomField';
import { Navbar } from 'components/Navbar/Navbar';
import { StyledForm } from 'components/StyledForm/StyledForm.styles';
import { sleep } from 'utils/sleep';

import { InputWrapper } from './PageEditCountry.styles';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export const PageEditCountry = () => {
  const [loading, setLoading] = useState(false);
  const [initialValue, setInitialValue] = useState<
    | Record<string, string | number | Record<string, number | string>>
    | undefined
  >(undefined);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    getCountryById(parseInt(id || '0')).then(async (data) => {
      if (data) {
        await sleep(200);
        setInitialValue(data);
      }
    });
    setLoading(false);
  }, [id]);

  const onSubmit = useCallback(
    async (
      values: Record<string, string | Record<string, string | number>>,
    ) => {
      setLoading(true);

      return updateCountryById(parseInt(id || '0'), values).then(
        async (value) => {
          if (value) {
            await sleep(2000);
          } else {
            console.error('Error while PUT country fetch');
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
