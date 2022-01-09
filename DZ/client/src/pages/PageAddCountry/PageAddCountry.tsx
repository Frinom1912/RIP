import React, { useCallback, useState } from 'react';
import { Form } from 'react-final-form';
import { TailSpin } from 'react-loader-spinner';
import { addCountry } from 'api';

import { Button } from 'components/Button';
import { CustomField } from 'components/fields/CustomField';
import { Navbar } from 'components/Navbar/Navbar';
import { StyledForm } from 'components/StyledForm/StyledForm.styles';
import { sleep } from 'utils/sleep';

import { InputWrapper } from './PageAddCountry.styles';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export const PageAddCountry = () => {
  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(
    async (
      values: Record<string, string | Record<string, string | number>>,
    ) => {
      setLoading(true);

      return addCountry(values).then(async (value) => {
        if (value) {
          await sleep(2000);
        } else {
          console.error('Error while POST country fetch');
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
