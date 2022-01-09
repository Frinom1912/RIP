import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getCountryById } from 'api';
import { CountryDataType } from 'api/types';

import { CountryCard } from 'components/CountryCard';
import { Navbar } from 'components/Navbar/Navbar';

import { PageCoutnryWrapper } from './PageCountry.styles';

export const PageCountry = (): JSX.Element => {
  const [country, setCountry] = useState<CountryDataType>();
  const { id } = useParams();

  useEffect(() => {
    getCountryById(parseInt(id || '0')).then((data) => {
      setCountry(data);
    });
  }, [id]);

  if (country) {
    return (
      <PageCoutnryWrapper>
        <Navbar />
        <CountryCard data={country} detailed />
      </PageCoutnryWrapper>
    );
  }
  return <></>;
};
