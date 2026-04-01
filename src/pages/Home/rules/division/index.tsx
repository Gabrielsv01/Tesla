import React, {useState} from 'react';

import {calcDiv} from 'shared/utils/calcLevel';

import * as S from '../../styles';

const DivisionRules: React.FC = () => {
  const [result, setResult] = useState<ReturnType<typeof calcDiv>>();
  const [firstValue, setFirstValue] = useState(0);
  const [secondValue, setSecondValue] = useState(0);

  const handleCalcDiv = (dividendo: number, divisor: number) => {
    if (divisor >= 0 && dividendo >= 0) {
      setResult(calcDiv(dividendo, divisor));
      return;
    }
    setResult(undefined);
  };

  return (
    <S.Card>
      <S.Title>Regra da Divisão (Encaixe de Blocos)</S.Title>
      <S.CardWrapper disableMaxHeight>
        <S.SubTitle>Conceito</S.SubTitle>
        <S.Description>
          A divisão no sistema de Levels é entendida como o{' '}
          <b>acúmulo de blocos</b> do Divisor (B) até preencher o volume do
          Dividendo (A).
          <br />O objetivo é encontrar o maior <b>Quociente (Q)</b> possível sem
          ultrapassar o alvo.
        </S.Description>

        <S.SubTitle>Passos da Divisão</S.SubTitle>
        <S.Description>
          <ul>
            <li>
              <b>1. Bloco de Referência (Dezena):</b> Calcula-se quanto valem 10
              unidades do Divisor para saltar grandes volumes de Level.
            </li>
            <li>
              <b>2. Estimativa por Acúmulo:</b> Soma-se o Bloco de Referência
              até chegar próximo ao Level do Dividendo.
            </li>
            <li>
              <b>3. Ajuste Fino (Primitivo):</b> Soma-se o Divisor unitário para
              preencher o espaço restante.
            </li>
            <li>
              <b>4. Identificação do Resto:</b> A diferença entre o volume total
              do Dividendo e o volume alcançado pelo Quociente é o Resto (R).
            </li>
          </ul>
        </S.Description>

        <S.SubTitle>Exemplo Prático: 234.557 ÷ 8.773</S.SubTitle>
        <S.Description>
          <b>Valores de Entrada:</b>
          <ul>
            <li>
              <b>Alvo (A):</b> Level 26061 | Primitivo 8
            </li>
            <li>
              <b>Peça (B):</b> Level 974 | Primitivo 7
            </li>
          </ul>
        </S.Description>

        <S.Description>
          <b>1. Criando o Bloco de 10 unidades:</b>
          <br />
          Multiplicamos o Divisor por 10 (L=1, P=1) usando a regra da
          multiplicação:
          <br />
          <code>(9 * (974 * 1)) + (974 * 1) + (1 * 7) + 0 = </code>{' '}
          <b>9.747 Levels</b>
        </S.Description>

        <S.Description>
          <b>2. Empilhando Blocos de 10 (Dezenas):</b>
          <ul>
            <li>10 unidades: 9.747</li>
            <li>
              20 unidades: <b>19.494</b> (Próximo ao alvo 26.061)
            </li>
            <li>
              <i>30 unidades passariam (29.241)</i>
            </li>
          </ul>
        </S.Description>

        <S.Description>
          <b>3. Preenchimento Unitário (Primitivo):</b>
          <br />
          Faltam 6.567 Levels para o alvo. Adicionamos peças de 974 Levels:
          <ul>
            <li>21 total: 19.494 + 974 = 20.468</li>
            <li>22 total: 20.468 + 974 = 21.442</li>
            <li>23 total: 21.442 + 974 = 22.416</li>
            <li>24 total: 22.416 + 974 = 23.390</li>
            <li>25 total: 23.390 + 974 = 24.364</li>
            <li>
              26 total: 24.364 + 974 = <b>25.338*</b>
              <br />
              <small>
                <i>
                  *Nota: O valor 25.338 é uma estimativa visual rápida. Abaixo
                  faremos o cálculo de precisão.
                </i>
              </small>
            </li>
          </ul>
        </S.Description>

        <S.Description>
          <S.SubTitle>Resultado e Resto</S.SubTitle>
          <b>Cálculo Exato do Quociente 26 (L=2, P=8):</b>
          <br />
          Para validar o Quociente 26, aplicamos a regra da multiplicação entre
          o Divisor (L=974, P=7) e o Quociente (L=2, P=8):
          <br />
          <br />
          <ul>
            <li>
              <b>1. Interação Níveis:</b>
              <br />
              <code>9 * (974 * 2) = </code> <b>17.532</b>
            </li>
            <li>
              <b>2. Cruzamento A (974 * 8):</b> <b>7.792</b>
            </li>
            <li>
              <b>3. Cruzamento B (2 * 7):</b> <b>14</b>
            </li>
            <li>
              <b>4. Transporte (Carry):</b> <code>⌊56 / 9⌋ = </code> <b>6</b>
            </li>
            <br />
            <li>
              <b>Level Total Alcançado:</b>{' '}
              <code>17.532 + 7.792 + 14 + 6 = </code> <b>25.344</b>
            </li>
            <li>
              <b>Primitivo Alcançado:</b> <code>56 - (6 * 9) = </code> <b>2</b>
            </li>
          </ul>
          <br />
          <hr />
          <b>Identificação do Resto (O que sobrou do alvo original):</b>
          <br />
          <code>Level do Resto: 26061 (Alvo) - 25344 (Alcançado) = </code>{' '}
          <b>717</b>
          <br />
          <code>Primitivo do Resto: 8 (Alvo) - 2 (Alcançado) = </code> <b>6</b>
          <br />
          <br />
          <b>Final: Quociente 26 | Resto L=717, P=6</b>
        </S.Description>

        <S.SubTitle>
          Nota sobre Restos e Decimais
          <br />
          (Amplificação)
        </S.SubTitle>
        <S.Description>
          O <b>Resto L=717, P=6</b> representa o valor inteiro <b>6.459</b>.
          Para obter precisão decimal, o resto deve ser tratado como um novo
          dividendo natural.
          <br />
          <br />
          <b>Processo de Amplificação Sucessiva:</b>
          <ol>
            <li>
              <b>Primeira Casa (Décimos):</b>
              <br />
              Amplificamos o resto: 6.459 * 10 = <b>64.590</b>.
              <br />
              Dividindo 64.590 por 8.773, cabem <b>7</b> blocos inteiros.
              <br />
              <i>(Consumo do reservatório: 8.773 * 7 = 61.411)</i>
              <br />
              Resultado acumulado: <b>26,7</b>
            </li>
            <br />
            <li>
              <b>Segunda Casa (Centésimos):</b>
              <br />
              Novo resto (64.590 - 61.411) = <b>3.179</b>.
              <br />
              Amplificamos novamente: 3.179 * 10 = <b>31.790</b>.
              <br />
              Dividindo 31.790 por 8.773, cabem <b>3</b> blocos inteiros.
              <br />
              <i>(Consumo do reservatório: 8.773 * 3 = 26.319)</i>
              <br />
              Resultado acumulado: <b>26,73</b>
            </li>
          </ol>
          <br />
          Este processo permite extrair o resultado decimal como uma sequência
          de números naturais, onde cada subtração representa o volume gasto
          para preencher aquela casa decimal.
        </S.Description>

        <div
          style={{
            background: 'grey',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}>
          <S.Input
            inputMode="numeric"
            placeholder="Digite o dividendo"
            onChange={value => {
              const parsedValue =
                value.target.value === '' || value.target.value === '0'
                  ? 0
                  : Number.parseInt(value.target.value, 10);
              setFirstValue(parsedValue);
              handleCalcDiv(parsedValue, secondValue);
            }}
          />
          <S.Input
            inputMode="numeric"
            placeholder="Digite o divisor"
            onChange={value => {
              const parsedValue =
                value.target.value === '' || value.target.value === '0'
                  ? 0
                  : Number.parseInt(value.target.value, 10);
              setSecondValue(parsedValue);
              handleCalcDiv(firstValue, parsedValue);
            }}
          />
        </div>
        {secondValue === 0 && (
          <S.Description>
            Informe um divisor maior que 0 para calcular a divisão.
          </S.Description>
        )}
        {result && 'error' in result && (
          <S.Description>{result.error}</S.Description>
        )}
        <S.CardWrapper>
          <div>
            Quociente: {result && 'quociente' in result ? result.quociente : ''}
          </div>
          <div>
            Inteiro:{' '}
            {result && 'inteiro' in result ? result?.inteiro?.toString() : ''}
          </div>
          <div>
            Resto level:{' '}
            {result && 'restoFinal' in result
              ? result?.restoFinal?.level?.toString()
              : ''}
          </div>
          <div>
            Resto primitivo:{' '}
            {result && 'restoFinal' in result
              ? result?.restoFinal?.primitive.toString()
              : ''}
          </div>
          <div>
            Resto valor:{' '}
            {result && 'restoFinal' in result
              ? result?.restoFinal?.valor.toString()
              : ''}
          </div>
        </S.CardWrapper>
      </S.CardWrapper>
    </S.Card>
  );
};

export default DivisionRules;
