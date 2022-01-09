import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Card } from './Card';
import { CardProps } from './Card.types';

export default {
  title: 'Card',
  component: Card,
} as Meta;

const Template: Story<CardProps> = (args) => <Card {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  data: {
    pk: 1,
    url: 'https://google.com',
    imageSrc:
      'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg',
    stars: 5,
    name: 'Москва',
    country_code: 1,
  },
};
