import styled from 'styled-components';

import {theme} from 'shared/theme/variables';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: darkorange;
  min-height: 100vh;
`;

export const Button = styled.button`
  margin: ${theme.spacing.small}px;
  padding: ${theme.spacing.small}px;
  border-radius: ${theme.border.radius.small}px;
`;
