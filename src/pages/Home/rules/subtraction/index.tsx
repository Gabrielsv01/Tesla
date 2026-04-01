import React, {useState} from 'react';

import {theme} from 'shared/theme/variables';
import {calcSub} from 'shared/utils/calcLevel';

import * as S from '../../styles';

const SubtractionRules: React.FC = () => {
  const [level, setLevel] = useState<{
    level: number;
    primitive: number;
    delta: number;
    value: number;
  }>();

  const [firstValue, setFirstValue] = useState(0);
  const [secondValue, setSecondValue] = useState(0);

  const handleCalcSub = (a: number, b: number) => {
    setLevel(calcSub(a, b));
  };

  return (
    <S.Card>
      <S.Title>Regra da subtração</S.Title>
      <S.CardWrapper disableMaxHeight>
        <S.SubTitle>Primitivos</S.SubTitle>

        <S.Description>
          <b>1. O cálculo do Primitivo P(*)</b>:
          <br />
          <br />
          O primitivo do resultado depende da relação entre os primitivos
          originais.
          <br />
          <br />
          Caso direto: se <b>P(A) {'>='} P(B)</b>, você subtrai normalmente.
        </S.Description>

        <S.Description>
          <ul>
            <li>
              <b>Exemplo</b>: Se P(A)=7 e P(B)=6,
              <br />
              fazemos (7 - 6) = 1.
            </li>
          </ul>
        </S.Description>

        <S.Description>
          Caso com Empréstimo: Se <b>P(A) {'<'} P(B)</b>, o valor de <b>A</b> é
          pequeno demais. Você deve somar <b>9</b> ao <b>P(A)</b> antes de
          subtrair.
        </S.Description>

        <S.Description>
          <ul>
            <li>
              <b>Exemplo</b>: Se <b>P(A)=2</b> e <b>P(B)=7</b>,
              <br />
              fazemos (2 + 9) - 7 = <b>4</b>.
            </li>
          </ul>
        </S.Description>
        <S.Description>
          Caso da igualdade: Se <b>P(A) = P(B)</b>, o valor de <b>A</b> é igual
          ao valor de <b>B</b>. Não é necessário somar <b>9</b> ao <b>P(A)</b>.
        </S.Description>

        <S.Description>
          <ul>
            <li>
              <b>Exemplo</b>: Se <b>P(A)=2</b> e <b>P(B)=7</b>,
              <br />
              fazemos (2 + 9) - 7 = <b>4</b>.
            </li>
          </ul>
          <br />
        </S.Description>

        <S.SubTitle>Levels</S.SubTitle>

        <S.Description>
          O Cálculo do Level L(C): o nível do resultado é a subtração dos níveis
          originais, ajustada por uma variável de controle chamada δ (Delta).
        </S.Description>

        <S.Description>
          <b>L(C) = L(A) - L(B) - δ</b>
        </S.Description>

        <S.Description>
          onde: <b>δ =</b>
          <ul>
            <li>
              <b>1</b> se P(A) {'<='} P(B)
            </li>
            <li>
              <b>0</b> se P(A) {'>'} P(B)
            </li>
          </ul>
        </S.Description>

        <S.Description>
          <ul>
            <li>
              <b>Sem Empréstimo</b>: 72520 - 65157
              <br />
              Primitivos: 7 - 6 = <b>1</b> | Level: 8057 - 7239 = <b>818</b> | δ
              = 0
            </li>
            <li>
              <b>Com Empréstimo</b>: 47666 - 44170
              <br />
              Primitivos: 2 → (2+9) - 7 = <b>4</b> | δ = 1
            </li>
          </ul>
        </S.Description>

        <div
          style={{
            background: 'grey',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            marginTop: theme.spacing.medium,
          }}>
          <S.Input
            inputMode="numeric"
            placeholder="Digite o primeiro número"
            onChange={value => {
              const parsedValue =
                value.target.value === '' || value.target.value === '0'
                  ? 0
                  : Number.parseInt(value.target.value, 10);
              setFirstValue(parsedValue);
              handleCalcSub(parsedValue, secondValue);
            }}
          />
          <S.Input
            inputMode="numeric"
            placeholder="Digite o segundo número"
            onChange={value => {
              const parsedValue =
                value.target.value === '' || value.target.value === '0'
                  ? 0
                  : Number.parseInt(value.target.value, 10);
              setSecondValue(parsedValue);
              handleCalcSub(firstValue, parsedValue);
            }}
          />
        </div>
        <S.CardWrapper>
          <div>Level: {level?.level.toString()}</div>
          <div>Primitivo: {level?.primitive.toString()}</div>
          <div>Delta: {level?.delta.toString()}</div>
          <div>Value: {level?.value.toString()}</div>
        </S.CardWrapper>
      </S.CardWrapper>
    </S.Card>
  );
};

export default SubtractionRules;
