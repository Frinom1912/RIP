import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getHotels } from 'api';
import { HotelDataType } from 'api/types';

import { Card } from 'components/Card/Card';
import { Navbar } from 'components/Navbar/Navbar';

import { PageMainWrapper } from './PageMain.styles';

export const PageMain = (): JSX.Element => {
  const [hotels, setHotels] = useState<HotelDataType[]>();
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    getHotels().then((data) => {
      if (params.get('country')) {
        const parsedData = data?.filter((elem) => {
          if (params.get('country')) {
            return (
              elem.country_code === parseInt(params.get('country') || '-1')
            );
          } else {
            return true;
          }
        });
        setHotels(parsedData);
      } else {
        if (params.get('hotelName')) {
          const parsedData = data?.filter((elem) => {
            if (params.get('hotelName')) {
              return elem.name.includes(params.get('hotelName') || '');
            } else {
              return true;
            }
          });
          setHotels(parsedData);
        } else {
          setHotels(data);
        }
      }
    });
  }, [params]);

  const onRemoveClick = useCallback((id: number) => {
    setHotels((prev) => prev?.filter((value) => value.pk !== id));
  }, []);

  return (
    <PageMainWrapper>
      <Navbar detailed onChange={setParams} />
      {hotels?.map((hotel) => (
        <Card
          key={hotel.pk}
          data={hotel}
          onRemove={() => onRemoveClick(hotel.pk)}
        />
      ))}
    </PageMainWrapper>
  );
};
