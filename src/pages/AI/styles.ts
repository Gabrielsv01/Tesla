import styled from 'styled-components';

import media from 'shared/theme/media';
import {theme} from 'shared/theme/variables';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: darkorange;
`;

export const Input = styled.input`
  margin: ${theme.spacing.small}px;
  padding: ${theme.spacing.small}px;
  border-radius: ${theme.border.radius.small}px;
`;

export const Button = styled.button`
  margin: ${theme.spacing.small}px;
  padding: ${theme.spacing.small}px;
  border-radius: ${theme.border.radius.small}px;
`;

export const Title = styled.h1`
  color: ${theme.colors.white};
`;
export const Card = styled.div`
  margin: ${theme.spacing.medium}px;
  background: ${theme.colors.secunday};
  border-radius: ${theme.border.radius.small}px;
  padding: ${theme.spacing.medium}px ${theme.spacing.medium}px
    ${theme.spacing.large}px;
  width: 400px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${media.mobile`
    width: 80%;
  `}
`;

export const CardWrapper = styled.div<{disableMaxHeight?: boolean}>`
  width: 100%;
  background-color: white;
  display: flex;
  max-height: ${({disableMaxHeight}) => (disableMaxHeight ? 'none' : '200px')};
  flex-direction: column;
  align-items: center;
  font-size: ${theme.fontSize.medium}px;
  font-weight: ${theme.fontWeight.bold};
  overflow-y: scroll;
  border-radius: ${theme.border.radius.small}px;
  padding: ${theme.spacing.small}px ${theme.spacing.zero}px;
`;

export const WrapperNumber = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: ${theme.spacing.small}px;
`;

export const WrapperEchart = styled.div`
  ${media.mobile`
    padding: ${theme.spacing.zero}px ${theme.spacing.medium}px;
  `}
`;

export const SubTitle = styled.h2``;

export const Description = styled.p`
  font-weight: ${theme.fontWeight.regular};
  margin: ${theme.spacing.small}px ${theme.spacing.small}px
    ${theme.spacing.zero}px;
`;
