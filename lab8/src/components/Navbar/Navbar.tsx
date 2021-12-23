import React from 'react';

import { Button } from 'components/Button';
import { StyledLink } from 'components/StyledLink/StyledLink.style';

import { NavbarWrapper } from './Navbar.styles';

export const Navbar = () => {
  return (
    <NavbarWrapper>
      <StyledLink to="/">
        <Button>Home</Button>
      </StyledLink>
      <StyledLink to="/hotel/add">
        <Button>Add hotel</Button>
      </StyledLink>
    </NavbarWrapper>
  );
};
