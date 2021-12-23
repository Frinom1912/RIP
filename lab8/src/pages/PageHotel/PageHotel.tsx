import { Colors } from 'constants/colors';

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getHotelById } from 'api';
import { HotelDataType } from 'api/types';

import { Button } from 'components/Button';
import { Card } from 'components/Card/Card';
import { Navbar } from 'components/Navbar/Navbar';
import { StyledLink } from 'components/StyledLink/StyledLink.style';

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
        <Card data={hotel} />
      </>
    );
  }
  return <></>;
};
