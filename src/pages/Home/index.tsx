import React, {useState} from 'react';

// import Echart from 'shared/components/Echart/Echart';
import {buildNumbers} from 'shared/utils/buildNumbers';
import {calcLevel} from 'shared/utils/calcLevel';

import {data} from './utils';

import * as S from './styles';

const Home: React.FC = () => {
  const [level, setLevel] = useState<{level: number; primitive: number}>();
  const [levelBase, setLevelBase] = useState<{
    levelBase: number;
    list: number[];
  }>();

  // const data = [
  //   2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
  //   73, 79, 83, 89, 97,
  // ];

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
    const secund = Math.floor(Math.random() * 100000);
    const sum = item + secund;
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
          {item} + {secund} = {sum}
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

  // const buildeChart = () =>
  //   data.map(item => {
  //     const {level: levelValue, primitive} = calcLevel(item);
  //     return [levelValue, primitive, 5];
  //   });

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
        <S.Title>Gerando dados pela soma até 10000</S.Title>
        <S.CardWrapper>
          {buildSum().map(item => (
            <b key={item.toString()}>{item}</b>
          ))}
        </S.CardWrapper>
      </S.Card>
    </S.Container>
  );
};

export default Home;
