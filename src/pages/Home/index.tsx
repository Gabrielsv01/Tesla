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
    const sum = item - secund;
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
          {item} - {secund} = {sum}
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
        <S.Title>Gerando dados pela subtração até 10000</S.Title>
        <S.CardWrapper>
          {buildSum().map(item => (
            <b key={item.toString()}>{item}</b>
          ))}
        </S.CardWrapper>
      </S.Card>
      <S.Card>
        <S.Title>Regra da soma</S.Title>
        <S.CardWrapper disableMaxHeight>
          <S.SubTitle>Primitivos</S.SubTitle>
          <S.Description>
            Se temos dois números <b>A</b> e <b>B</b> com os primitivos{' '}
            <b>P(A)</b> e <b>P(B)</b>, e a soma dos números <b>A + B</b> tem um
            primitivo <b>P(A + B)</b>, então a verificação é se{' '}
            <b>P(A) + P(B) = P(A + B)</b>.
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
            Para dois números <b>A e B</b> com níveis <b>L(A) e L(B)</b>, e a
            soma <b>A + B</b> com nível <b>L(A + B)</b>, a regra para o nível
            pode ser expressa assim:
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
              respectivamente, e a soma <b>A + B</b> tem primitivo{' '}
              <b>P(A + B)</b>, então: Se <b>P(A) + P(B) {'>'} 9</b>, então{' '}
              <b>L(A + B) = L(A) + L(B) + 1</b>. Caso contrário,{' '}
              <b>L(A + B) = L(A) + L(B)</b>.
            </ul>
          </S.Description>
          <S.Description />
        </S.CardWrapper>
      </S.Card>
    </S.Container>
  );
};

export default Home;
