import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getHotelById } from 'api';
import { HotelDataType } from 'api/types';

import { Card } from 'components/Card/Card';
import { Navbar } from 'components/Navbar/Navbar';

export const PageHotel = (): JSX.Element => {
  const [hotel, setHotel] = useState<HotelDataType>();
  const { id } = useParams();

  useEffect(() => {
    getHotelById(parseInt(id || '0')).then((data) => {
      setHotel(data);
    });
  }, [id]);

  if (hotel) {
    return (
      <>
        <Navbar />
        <Card data={hotel} detailed />
      </>
    );
  }
  return <></>;
};
