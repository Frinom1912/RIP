import React, { useCallback, useEffect, useState } from 'react';
import { getCountries, getHotels } from 'api';
import { CountryDataType } from 'api/types';

import { CountryCard } from 'components/CountryCard';
import { Navbar } from 'components/Navbar/Navbar';

import { PageMainWrapper } from './PageCountries.styles';

export const PageCountries = (): JSX.Element => {
  const [countries, setCountries] = useState<CountryDataType[]>();

  useEffect(() => {
    getCountries().then((data) => {
      getHotels().then((hotels) => {
        const parsedData = data?.filter(
          (elem) =>
            hotels?.filter((hotel) => hotel.country_code === elem.pk).length,
        );
        setCountries(parsedData);
      });
    });
  }, []);

  const onRemoveClick = useCallback((id: number) => {
    setCountries((prev) => prev?.filter((value) => value.pk !== id));
  }, []);

  return (
    <PageMainWrapper>
      <Navbar />
      {countries?.map((country) => (
        <CountryCard
          key={country.pk}
          data={country}
          onRemove={() => onRemoveClick(country.pk)}
        />
      ))}
    </PageMainWrapper>
  );
};
