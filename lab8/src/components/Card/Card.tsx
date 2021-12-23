import { Colors } from 'constants/colors';

import React, { useCallback } from 'react';
import { removeHotelById } from 'api';
import { ReactComponent as IcClose } from 'assets/icons/close.svg';

import { Button } from 'components/Button';
import { Image } from 'components/Image';
import { StyledLink } from 'components/StyledLink/StyledLink.style';
import { Text } from 'components/Text';

import { CardWrapper } from './Card.styles';
import { CardProps } from './Card.types';
import { CardNavbar } from './CardNavbar';

export const Card = ({ data, onRemove }: CardProps): JSX.Element => {
  const handleRemoveCard = useCallback(async () => {
    await removeHotelById(data.pk);
    if (onRemove) {
      onRemove();
    }
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
      <StyledLink to={`/hotel/${data.pk}`}>
        <Button
          backgroundColor={Colors.MAIN}
          backgroundHoverColor={Colors.MAIN_HOVERED}
        >
          Открыть
        </Button>
      </StyledLink>
    </CardWrapper>
  );
};
