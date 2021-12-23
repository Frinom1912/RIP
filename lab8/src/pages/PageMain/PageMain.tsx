import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { getHotels } from 'api';
import { HotelDataType } from 'api/types';

import { Card } from 'components/Card/Card';
import { Navbar } from 'components/Navbar/Navbar';

import { PageMainWrapper } from './PageMain.styles';

export const PageMain = (): JSX.Element => {
  const [hotels, setHotels] = useState<HotelDataType[]>();

  useEffect(() => {
    getHotels().then((data) => {
      setHotels(data);
    });
  }, []);

  const onRemoveClick = useCallback((id: number) => {
    setHotels((prev) => prev?.filter((value) => value.pk !== id));
  }, []);

  const onFilter = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    getHotels().then((data) => {
      setHotels(
        data?.filter((value) => value.name.includes(event.target.value)),
      );
    });
  }, []);

  return (
    <PageMainWrapper>
      <Navbar />
      <div
        style={{ width: '100%', display: 'flex', justifyContent: 'center ' }}
      >
        <input name="name" placeholder="Найти" onChange={onFilter}></input>
      </div>
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
