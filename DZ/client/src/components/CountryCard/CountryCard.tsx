import { Colors } from 'constants/colors';

import React, { useCallback, useEffect, useState } from 'react';
import { getHotels, removeCountryById } from 'api';
import { HotelDataType } from 'api/types';
import { ReactComponent as IcClose } from 'assets/icons/close.svg';

import { Button } from 'components/Button';
import { StyledLink } from 'components/StyledLink/StyledLink.style';
import { Text } from 'components/Text';

import { CardNavbar } from './CardNavbar';
import { CardWrapper } from './CountryCard.styles';
import { CountryCardProps } from './CountryCard.types';
import { SmallCard } from './SmallCard';

export const CountryCard = ({
  data,
  onRemove,
  detailed,
}: CountryCardProps): JSX.Element => {
  const handleRemoveCard = useCallback(async () => {
    await removeCountryById(data.pk);
    if (onRemove) {
      onRemove();
    }
  }, []);

  const [hotels, setHotels] = useState<HotelDataType[]>();

  useEffect(() => {
    getHotels().then((value) => {
      if (value) {
        const parsedValue = value.filter(
          (element) => element.country_code === data.pk,
        );
        setHotels(parsedValue);
      }
    });
  }, []);

  return (
    <CardWrapper>
      <CardNavbar>
        <Button round onClick={handleRemoveCard}>
          <IcClose width={16} height={16} />
        </Button>
      </CardNavbar>
      <Text bold>{data.name}</Text>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {hotels && hotels.map((hotel) => <SmallCard data={hotel} />)}
      </div>
      {!detailed ? (
        <StyledLink to={`/country/${data.pk}`}>
          <Button
            backgroundColor={Colors.MAIN}
            backgroundHoverColor={Colors.MAIN_HOVERED}
          >
            Открыть
          </Button>
        </StyledLink>
      ) : (
        <StyledLink to={`/country/${data.pk}/edit`}>
          <Button
            backgroundColor={Colors.MAIN}
            backgroundHoverColor={Colors.MAIN_HOVERED}
          >
            Редактировать
          </Button>
        </StyledLink>
      )}
    </CardWrapper>
  );
};
