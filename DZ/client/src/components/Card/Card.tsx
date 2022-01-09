import { Colors } from 'constants/colors';

import React, { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { removeHotelById } from 'api';
import { ReactComponent as IcClose } from 'assets/icons/close.svg';

import { Button } from 'components/Button';
import { Image } from 'components/Image';
import { StyledLink } from 'components/StyledLink/StyledLink.style';
import { Text } from 'components/Text';

import { CardWrapper } from './Card.styles';
import { CardProps } from './Card.types';
import { CardNavbar } from './CardNavbar';

export const Card = ({ data, onRemove, detailed }: CardProps): JSX.Element => {
  const handleRemoveCard = useCallback(async () => {
    await removeHotelById(data.pk);
    if (onRemove) {
      onRemove();
    }
  }, []);

  const navigator = useNavigate();

  const handleCountryClick = useCallback(() => {
    const params = new URLSearchParams();
    params.append('country', data.country_code.toString());
    navigator({ search: params.toString() });
  }, []);

  return (
    <CardWrapper>
      <CardNavbar>
        <Button round onClick={handleRemoveCard}>
          <IcClose width={16} height={16} />
        </Button>
      </CardNavbar>
      <a href={data.url}>
        <Image src={data.imageSrc}></Image>
      </a>
      <Text bold>{data.name}</Text>
      <Text>Количество звезд: {data.stars}</Text>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Text style={{ paddingRight: '10px' }}>
          Страна: {data.country?.name}
        </Text>
        <Button
          backgroundColor={Colors.MAIN}
          backgroundHoverColor={Colors.MAIN_HOVERED}
          onClick={handleCountryClick}
        >
          Перейти
        </Button>
      </div>
      {!detailed ? (
        <StyledLink to={`/hotel/${data.pk}`}>
          <Button
            backgroundColor={Colors.MAIN}
            backgroundHoverColor={Colors.MAIN_HOVERED}
          >
            Открыть
          </Button>
        </StyledLink>
      ) : (
        <StyledLink to={`/hotel/${data.pk}/edit`}>
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
