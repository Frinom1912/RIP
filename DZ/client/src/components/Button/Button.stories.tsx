import { Colors } from 'constants/colors';

import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Button } from './Button.style';
import { ButtonProps } from './Button.types';

export default {
  title: 'Button',
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args}>Test</Button>;

export const Primary = Template.bind({});
Primary.args = {
  backgroundColor: Colors.MAIN,
  backgroundHoverColor: Colors.MAIN_HOVERED,
};
