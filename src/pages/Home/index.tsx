import React, {useState} from 'react';

import {buildNumbers} from 'shared/utils/buildNumbers';
import {calcLevel, calcValue} from 'shared/utils/calcLevel';

import MultiplicationRules from './rules/multiplication';
import SubtractionRules from './rules/subtraction';
import SumRules from './rules/sum';
import {data} from './utils';

import * as S from './styles';

const Home: React.FC = () => {
  const [level, setLevel] = useState<{level: number; primitive: number}>();
  const [levelBase, setLevelBase] = useState<{
    levelBase: number;
    list: number[];
  }>();
  const [searchLevel, setSearchLevel] = useState('');
  const [searchPrimitive, setSearchPrimitive] = useState('');
  const [foundNumber, setFoundNumber] = useState<number | null>(null);

  const renderItems = (item: number) => {
    const {level: levelValue, primitive} = calcLevel(item);

    return (
      <S.WrapperNumber key={item}>
        <div>Numero: {item}</div>
        <div>Primitive: {primitive}</div>
        <div>LevelValue: {levelValue}</div>
      </S.WrapperNumber>
    );
  };

  const renderSum = (item: number) => {
    const secund = Math.floor(Math.random() * 100);
    const sum = item * secund;
    if (sum < 0) {
      return <div />;
    }
    const {level: levelValueSum, primitive: primitiveSum} = calcLevel(sum);
    const {level: levelValueSecund, primitive: primitiveSecund} =
      calcLevel(secund);
    const {level: levelValue, primitive} = calcLevel(item);

    return (
      <S.WrapperNumber key={item}>
        <div>
          {item} = Level {levelValue} e Primitivo {primitive}
        </div>
        <div>
          {secund} = Level {levelValueSecund} e Primitivo {primitiveSecund}
        </div>
        <div>
          {item} * {secund} = {sum}
        </div>
        <div>
          {sum} = Level {levelValueSum} e Primitivo {primitiveSum}
        </div>
        <div>--------</div>
      </S.WrapperNumber>
    );
  };

  const buildSum = () => {
    const randomNumbers: number[] = [];
    for (let i = 0; i < 100; i += 1) {
      randomNumbers.push(Math.floor(Math.random() * 100000));
    }
    return randomNumbers.map(item => renderSum(item));
  };

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
      {/* <S.WrapperEchart>
        <Echart arialLabel="grafico" dataCustom={buildeChart()} />
      </S.WrapperEchart> */}
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
      <S.Card>
        <S.Title>Levels na base 1</S.Title>
        <S.Input
          inputMode="numeric"
          placeholder="Numero de levels"
          onChange={value => {
            if (value.target.value === '' || value.target.value === '0') {
              setLevelBase({
                levelBase: 0,
                list: [],
              });
            } else {
              setLevelBase({
                levelBase: parseInt(value.target.value, 10),
                list: [],
              });
            }
          }}
        />
        <S.Button
          onClick={() => {
            setLevelBase({
              levelBase: levelBase?.levelBase || 0,
              list: buildNumbers(levelBase?.levelBase || 0),
            });
          }}>
          Gerar
        </S.Button>
        <S.CardWrapper>
          <div>
            {levelBase?.list?.map(item => <div key={item}>{item}</div>)}
          </div>
        </S.CardWrapper>
      </S.Card>
      <S.Card>
        <S.Title>Numeros primos até 10000</S.Title>
        <S.CardWrapper>
          {data.map(item => (
            <div key={item}>{renderItems(item)}</div>
          ))}
        </S.CardWrapper>
      </S.Card>
      <S.Card>
        <S.Title>Gerando dados pela multiplicação até 10000</S.Title>
        <S.CardWrapper>
          {buildSum().map(item => (
            <b key={item.toString()}>{item}</b>
          ))}
        </S.CardWrapper>
      </S.Card>
      <SumRules />
      <SubtractionRules />
      <MultiplicationRules />
    </S.Container>
  );
};

export default Home;
