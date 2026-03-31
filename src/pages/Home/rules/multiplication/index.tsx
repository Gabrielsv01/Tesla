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
        <b>L(C) = 9(L(A) * L(B)) + (L(A) * P(B)) + (L(B) * P(A)) + Trabalho</b>
      </S.Description>

      <S.Description>
        Onde o <b>Trabalho</b> é o transporte do produto dos primitivos:
        <ul>
          <li>
            <b>⌊(P(A) * P(B)) / 9⌋</b> (Parte inteira da divisão)
          </li>
          <li>
            <i>Nota:</i> Se o produto for múltiplo de 9, subtrai-se 1 do
            Trabalho para manter o Primitivo 9.
          </li>
        </ul>
      </S.Description>

      <S.Description>
        <b>Exemplo Prático</b>: 52581 * 79
        <ul>
          <li>
            <b>A (52581)</b>: Level 5842 | Primitivo 3
          </li>
          <li>
            <b>B (79)</b>: Level 8 | Primitivo 7
          </li>
          <li>
            <b>Cálculo</b>:
            <br />
            9 * (5842 * 8) = 420624
            <br />
            (5842 * 7) = 40894
            <br />
            (8 * 3) = 24
            <br />
            Trabalho: ⌊(3 * 7) / 9⌋ = 2
            <br />
            <b>Total</b>: 420624 + 40894 + 24 + 2 = <b>461544</b>
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
            <b>1. Interação Níveis (Escala 9):</b>
            <br />
            Multiplicamos a interação dos níveis pela base do sistema.
            <br />
            <code>9 * (7666 * 2) = 9 * 15332 = </code> <b>137988</b>
          </li>
          <br />
          <li>
            <b>2. Cruzamento A (Nível A * Primitivo B):</b>
            <br />
            <code>7666 * 9 = </code> <b>68994</b>
          </li>
          <br />
          <li>
            <b>3. Cruzamento B (Nível B * Primitivo A):</b>
            <br />
            <code>2 * 8 = </code> <b>16</b>
          </li>
          <br />
          <li>
            <b>4. Trabalho (Transporte dos Primitivos):</b>
            <br />O produto <code>8 * 9 = 72</code> é múltiplo de 9.
            <br />
            Para manter o Primitivo como 9, subtraímos 1 do quociente:
            <br />
            <code>(72 / 9) - 1 = 8 - 1 = </code> <b>7</b>
          </li>
          <br />
          <li>
            <hr />
            <b>Level Final (Soma dos passos):</b>
            <br />
            <code>137988 + 68994 + 16 + 7 = </code> <b>207005</b>
          </li>
          <br />
          <li>
            <b>5. Primitivo Final:</b>
            <br />
            Como 72 é múltiplo de 9, o Primitivo Final é <b>9</b>.
          </li>
          <br />
          <li>
            <hr />
            <b>Resultado Estruturado (Base 9):</b>
            <br />L = 207005, P = 9
          </li>
        </ul>
      </S.Description>
    </S.CardWrapper>
  </S.Card>
);

export default MultiplicationRules;
