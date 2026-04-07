import React, {useState} from 'react';

import {buildNumbers} from 'shared/utils/buildNumbers';
import {calcLevel, calcValue} from 'shared/utils/calcLevel';

import DivisionRules from './rules/division';
import MultiplicationRules from './rules/multiplication';
import SubtractionRules from './rules/subtraction';
import SumRules from './rules/sum';

import * as S from './styles';

const Home: React.FC = () => {
  const [level, setLevel] = useState<{level: number; primitive: number}>();
  const [searchLevel, setSearchLevel] = useState('');
  const [searchPrimitive, setSearchPrimitive] = useState('');
  const [foundNumber, setFoundNumber] = useState<number | null>(null);

  const handleFindNumber = (
    levelInput = searchLevel,
    primitiveInput = searchPrimitive,
  ) => {
    const targetLevel = parseInt(levelInput, 10);
    const targetPrimitive = parseInt(primitiveInput, 10);

    const result = calcValue(targetLevel, targetPrimitive);

    setFoundNumber(result);
  };

  const foundNumberLabel = (() => {
    if (foundNumber === null) {
      return '-';
    }

    if (foundNumber >= 0) {
      return foundNumber;
    }

    return '-';
  })();

  return (
    <S.Container>
      <S.Card>
        <S.Title>Ai</S.Title>
        <S.CardWrapper>
          <button type="button">
            <a href="/ai" style={{textDecoration: 'none', color: 'inherit'}}>
              Ir para AI
            </a>
          </button>
        </S.CardWrapper>
      </S.Card>
      <S.Card>
        <S.Title>Gerar números</S.Title>
        <S.Description>
          Gerar os números a partir do level e primitivo do número 1.
        </S.Description>
        <S.CardWrapper>
          {buildNumbers(100).map(item => {
            const calc = calcLevel(item);

            return (
              <div key={item}>
                Número {item}: level {calc.level}
              </div>
            );
          })}
        </S.CardWrapper>
      </S.Card>
      <S.Card>
        <S.Title>Calcular level e primitivo</S.Title>
        <S.Input
          inputMode="numeric"
          placeholder="Digite um numero"
          onChange={value => {
            if (value.target.value === '' || value.target.value === '0') {
              setLevel(calcLevel(0));
            } else {
              setLevel(calcLevel(parseInt(value.target.value, 10)));
            }
          }}
        />
        <S.CardWrapper>
          <div>Level: {level && level.level.toString()}</div>
          <div>Primitivo: {level && level.primitive.toString()}</div>
        </S.CardWrapper>
      </S.Card>

      <S.Card>
        <S.Title>Encontrar número por level e primitivo</S.Title>
        <S.Input
          inputMode="numeric"
          placeholder="Digite o level"
          value={searchLevel}
          onChange={event => {
            const nextLevel = event.target.value;
            setSearchLevel(nextLevel);
            handleFindNumber(nextLevel, searchPrimitive);
          }}
        />
        <S.Input
          inputMode="numeric"
          placeholder="Digite o primitivo"
          value={searchPrimitive}
          onChange={event => {
            const nextPrimitive = event.target.value;
            setSearchPrimitive(nextPrimitive);
            handleFindNumber(searchLevel, nextPrimitive);
          }}
        />
        <S.CardWrapper>
          <div>Número: {foundNumberLabel}</div>
        </S.CardWrapper>
      </S.Card>
      <SumRules />
      <SubtractionRules />
      <MultiplicationRules />
      <DivisionRules />
    </S.Container>
  );
};

export default Home;
