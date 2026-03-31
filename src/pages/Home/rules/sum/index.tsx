import React from 'react';

import * as S from '../../styles';

const SumRules: React.FC = () => (
  <S.Card>
    <S.Title>Regra da soma</S.Title>
    <S.CardWrapper disableMaxHeight>
      <S.SubTitle>Primitivos</S.SubTitle>
      <S.Description>
        Se temos dois números <b>A</b> e <b>B</b> com os primitivos <b>P(A)</b>{' '}
        e <b>P(B)</b>, e a soma dos números <b>A + B</b> tem um primitivo{' '}
        <b>P(A + B)</b>, então a verificação é se <b>P(A) + P(B) = P(A + B)</b>.
      </S.Description>
      <S.Description>
        <p>22565 e 80630:</p>
        <ul>
          <li>
            Primitivo de 22565: <b>2</b>
          </li>
          <li>
            Primitivo de 80630: <b>8</b>
          </li>
          <li>
            Primitivo da soma (103195): <b>1</b>
          </li>
          <li>
            Soma dos primitivos <b>2 + 8 = 10</b>
          </li>
          <li>
            Primitivo de <b>10 </b>=<b> 1</b>
          </li>
        </ul>
      </S.Description>
      <S.SubTitle>Levels</S.SubTitle>
      <S.Description>
        Para dois números <b>A e B</b> com níveis <b>L(A) e L(B)</b>, e a soma{' '}
        <b>A + B</b> com nível <b>L(A + B)</b>, a regra para o nível pode ser
        expressa assim:
      </S.Description>
      <S.Description>
        <S.Description>
          <b>L(A + B) = L(A) + L(B) + δ</b>
        </S.Description>
        <S.Description>
          onde: <b> δ =</b>
          <S.Description>
            <li>
              <b>1</b> se P(A) + P(B) {'>'} 9
            </li>
            <li>
              <b>0</b> se P(A) + P(B) {'<='} 9
            </li>
          </S.Description>
        </S.Description>
      </S.Description>
      <S.Description>
        <ul>
          <b>Exemplo: </b>
          Se os números A e B têm primitivos <b>P(A) e P(B)</b>,
          respectivamente, e a soma <b>A + B</b> tem primitivo <b>P(A + B)</b>,
          então: Se <b>P(A) + P(B) {'>'} 9</b>, então{' '}
          <b>L(A + B) = L(A) + L(B) + 1</b>. Caso contrário,{' '}
          <b>L(A + B) = L(A) + L(B)</b>.
        </ul>
      </S.Description>
      <S.Description />
    </S.CardWrapper>
  </S.Card>
);

export default SumRules;
