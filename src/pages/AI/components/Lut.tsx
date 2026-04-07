import React, {useState, useMemo} from 'react';

import {calcLevel} from 'shared/utils/calcLevel';
import {getLutValues} from 'shared/utils/lutArithmetic';

import * as S from '../styles';

const Lut: React.FC = () => {
  // Estados para os inputs
  const [numA, setNumA] = useState<string>('');
  const [numB, setNumB] = useState<string>('');
  const [userPrimitivo, setUserPrimitivo] = useState<string>('');

  // Cálculos reativos usando useMemo para performance
  const trainingData = useMemo(() => {
    const valA = Number.parseInt(numA, 10);
    const valB = Number.parseInt(numB, 10);

    if (Number.isNaN(valA) || Number.isNaN(valB)) return null;

    const resA = calcLevel(valA);
    const resB = calcLevel(valB);

    // A mágica da LUT acontece aqui
    const lut = getLutValues(resA.primitive, resB.primitive);

    // Regra da Multiplicação de Níveis que você definiu:
    // L(C) = 9(La * Lb) + (La * Pb) + (Lb * Pa) + Transporte
    const interactionLevels = 9 * (resA.level * resB.level);
    const crossA = resA.level * resB.primitive;
    const crossB = resB.level * resA.primitive;
    const finalLevel = interactionLevels + crossA + crossB + lut.transport;

    const isCorrect = Number.parseInt(userPrimitivo, 10) === lut.primitive;

    return {
      resA,
      resB,
      lut,
      finalLevel,
      isCorrect,
      product: valA * valB,
    };
  }, [numA, numB, userPrimitivo]);

  let primitiveBorderColor = '#ccc';

  if (userPrimitivo !== '') {
    primitiveBorderColor = trainingData?.isCorrect ? '#4caf50' : '#f44336';
  }

  return (
    <S.Card>
      <S.Title>Simulador de Treinamento de IA</S.Title>
      <S.Description>
        Insira os números para validar a lógica de Primitivos e Níveis via LUT.
      </S.Description>

      <div
        style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '20px',
          marginTop: '20px',
          flexDirection: 'column',
        }}>
        <input
          placeholder="Número A"
          type="number"
          value={numA}
          onChange={e => setNumA(e.target.value)}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
        <input
          placeholder="Número B"
          type="number"
          value={numB}
          onChange={e => setNumB(e.target.value)}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
        <input
          placeholder="P(A * B) esperado"
          type="number"
          value={userPrimitivo}
          onChange={e => setUserPrimitivo(e.target.value)}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '2px solid',
            borderColor: primitiveBorderColor,
          }}
        />
      </div>

      {trainingData && (
        <S.CardWrapper disableMaxHeight>
          <div
            style={{
              padding: '15px',
              backgroundColor: '#f9f9f9',
              borderRadius: '8px',
            }}>
            <h3 style={{marginTop: 0}}>Análise da IA:</h3>
            <p>
              🔢 <b>A:</b> P({trainingData.resA.primitive}) L(
              {trainingData.resA.level})
            </p>
            <p>
              🔢 <b>B:</b> P({trainingData.resB.primitive}) L(
              {trainingData.resB.level})
            </p>

            <hr />

            <p>
              🎯 <b>Gabarito da LUT:</b>
            </p>
            <ul>
              <li>
                Primitivo Correto:{' '}
                <b style={{color: '#2196f3'}}>{trainingData.lut.primitive}</b>
              </li>
              <li>
                Transporte gerado (Carry): <b>+{trainingData.lut.transport}</b>
              </li>
            </ul>

            <p>
              🏗️ <b>Construção do Level Final:</b>
            </p>
            <code
              style={{
                fontSize: '12px',
                display: 'block',
                background: '#eee',
                padding: '10px',
              }}>
              9({trainingData.resA.level} * {trainingData.resB.level}) + (
              {trainingData.resA.level} * {trainingData.resB.primitive}) + (
              {trainingData.resB.level} * {trainingData.resA.primitive}) +{' '}
              {trainingData.lut.transport}
              <br />= <b>{trainingData.finalLevel}</b>
            </code>

            <div style={{marginTop: '15px', fontWeight: 'bold'}}>
              Resultado Final: {trainingData.product} <br />
              (L: {trainingData.finalLevel}, P: {trainingData.lut.primitive})
            </div>
          </div>
        </S.CardWrapper>
      )}
    </S.Card>
  );
};

export default Lut;
