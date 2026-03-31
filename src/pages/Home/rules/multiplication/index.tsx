import React from 'react';

import * as S from '../../styles';

const MultiplicationRules: React.FC = () => (
  <S.Card>
    <S.Title>Regra da multiplicação</S.Title>
    <S.CardWrapper disableMaxHeight>
      <S.SubTitle>Primitivos</S.SubTitle>

      <S.Description>
        <b>1. O cálculo do Primitivo P(C)</b>:
        <br />
        <br />
        O primitivo do resultado é o produto dos primitivos de A e B, reduzido a
        um único dígito (Prova dos Nove).
        <br />
        <br />
        <b>P(C) = P(P(A) * P(B))</b>
      </S.Description>

      <S.Description>
        <ul>
          <li>
            <b>Exemplo</b>: Se P(A)=7 e P(B)=8,
            <br />7 * 8 = 56 → 5 + 6 = 11 → 1 + 1 = <b>2</b>.
          </li>
        </ul>
      </S.Description>

      <S.SubTitle>Levels</S.SubTitle>

      <S.Description>
        <b>2. O cálculo do Level L(C)</b>:
        <br />O nível do resultado é a soma das interações entre os níveis e
        primitivos originais, acrescida do transporte (carry) do produto dos
        primitivos.
      </S.Description>

      <S.Description>
        <b>
          L(C) = 9(L(A) * L(B)) + (L(A) * P(B)) + (L(B) * P(A)) + Transporte
        </b>
      </S.Description>

      <S.Description>
        Onde o <b>Transporte</b> é o transporte do produto dos primitivos:
        <ul>
          <li>
            <b>⌊(P(A) * P(B)) / 9⌋</b> (Parte inteira da divisão)
          </li>
          <li>
            <i>Nota:</i> Se o produto for múltiplo de 9, subtrai-se 1 do
            Transporte para manter o Primitivo 9.
          </li>
        </ul>
      </S.Description>

      <S.Description>
        <S.SubTitle>Exemplo Números Maiores: 152 * 114</S.SubTitle>
        <ul>
          <li>
            <b>A (152)</b>: L = 16, P = 8
            <br />
            <b>B (114)</b>: L = 12, P = 6
          </li>
          <br />
          <li>
            <b>1. Interação Níveis:</b> <code>9 * (16 * 12) =</code> <b>1728</b>
          </li>
          <li>
            <b>2. Cruzamento A (16 * 6):</b> <b>96</b>
          </li>
          <li>
            <b>3. Cruzamento B (12 * 8):</b> <b>96</b>
          </li>
          <li>
            <b>4. Transporte:</b> Produto <code>8 * 6 = 48</code>.
            <br />
            Como 48 não divide por 9, utiliza apenas a parte inteira, no caso 5:{' '}
            <code>⌊48 / 9⌋ =</code> <b>5</b>
          </li>
          <br />
          <li>
            <b>Level Final:</b> <code>1728 + 96 + 96 + 5 =</code> <b>1925</b>
          </li>
          <li>
            <b>Primitivo Final:</b> <code>P(48) = 4 + 8 = 12 → 1 + 2 =</code>{' '}
            <b>3</b>
          </li>
        </ul>
      </S.Description>

      <S.Description>
        <S.SubTitle>Exemplo Primitivo 9: 69002 * 27</S.SubTitle>
        <br />
        <ul>
          <li>
            <b>Valores de Entrada:</b>
            <br />
            <b>A (69002)</b>: L = 7666, P = 8
            <br />
            <b>B (27)</b>: L = 2, P = 9
          </li>
          <br />
          <li>
            <b>1. Interação Níveis:</b>
            <br />
            <code>9 * (7666 * 2) = </code> <b>137988</b>
          </li>
          <br />
          <li>
            <b>2. Cruzamento A:</b>
            <br />
            <code>7666 * 9 = </code> <b>68994</b>
          </li>
          <br />
          <li>
            <b>3. Cruzamento B:</b>
            <br />
            <code>2 * 8 = </code> <b>16</b>
          </li>
          <br />
          <li>
            <b>4. Transporte (Múltiplo de 9):</b>
            <br />O produto <code>8 * 9 = 72</code>.
            <br />
            Subtraímos 1 para manter Primitivo 9:
            <br />
            <code>(72 / 9) - 1 = </code> <b>7</b>
          </li>
          <br />
          <li>
            <hr />
            <b>Level Final:</b> <b>207005</b>
            <br />
            <b>Primitivo Final:</b> <b>9</b>
          </li>
        </ul>
      </S.Description>

      <S.Description>
        <S.SubTitle>Exemplo de Transporte (Caso Simples): 125 * 13</S.SubTitle>
        <br />
        <ul>
          <li>
            <b>A (125)</b>: L = 13, P = 8
            <br />
            <b>B (13)</b>: L = 1, P = 4
          </li>
          <br />
          <li>
            <b>Transporte:</b> Produto <code>32</code>.<code> ⌊32 / 9⌋ = </code>{' '}
            <b>3</b>
          </li>
          <li>
            <b>Primitivo Final:</b> <code>P(32) = </code> <b>5</b>
          </li>
        </ul>
      </S.Description>
    </S.CardWrapper>
  </S.Card>
);

export default MultiplicationRules;
