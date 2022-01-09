import { Colors } from 'constants/colors';

import React from 'react';

import { Button } from 'components/Button';
import { CardProps } from 'components/Card/Card.types';
import { Image } from 'components/Image';
import { StyledLink } from 'components/StyledLink/StyledLink.style';
import { Text } from 'components/Text';

import { SmallCardWrapper } from './SmallCard.styles';

export const SmallCard = ({ data, detailed }: CardProps): JSX.Element => {
  return (
    <SmallCardWrapper>
      <a href={data.url}>
        <Image src={data.imageSrc}></Image>
      </a>
      <Text bold>{data.name}</Text>
      <Text>Количество звезд: {data.stars}</Text>
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
    </SmallCardWrapper>
  );
};
