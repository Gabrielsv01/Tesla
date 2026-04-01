const calcLevel = (value: number) => {
  if (value === 0) return {level: 0, primitive: 0};

  // O Primitivo é o resto da divisão por 9 (ajustado para 1-9)
  const primitive = ((value - 1) % 9) + 1;

  // O Level é a divisão inteira após remover o "excesso" do primitivo
  // Math.floor garante que o resultado seja um número inteiro
  const level = Math.floor((value - 1) / 9);

  return {level, primitive};
};

const calcValue = (level: number, primitive: number) => level * 9 + primitive;

const calcPrimitive = (value: number): number => {
  if (value === 0) return 0;
  const mod = value % 9;
  return mod === 0 ? 9 : mod;
};

const calcSum = (a: number, b: number) => {
  const calcA = calcLevel(a);
  const calcB = calcLevel(b);

  const sumPrimitive = calcA.primitive + calcB.primitive;

  // O Primitivo da soma é a redução da soma dos primitivos
  const primitive = calcPrimitive(sumPrimitive);

  // REGRA DO DELTA: Identifica o transbordo de nível
  const delta = sumPrimitive > 9 ? 1 : 0;

  // L(A + B) = L(A) + L(B) + δ
  const sumLevel = calcA.level + calcB.level + delta;

  const value = calcValue(sumLevel, primitive);

  return {value, level: sumLevel, primitive, delta};
};

/**
 * Regra da Subtração:
 * L(C) = L(A) - L(B) - δ
 * Onde δ = 1 se P(A) <= P(B), senão 0.
 */
const calcSub = (a: number, b: number) => {
  const calcA = calcLevel(a);
  const calcB = calcLevel(b);

  // 1. Cálculo do Delta (Empréstimo de Nível)
  // Se o Primitivo de A for menor ou igual ao de B, precisamos "pedir emprestado" do Level.
  const delta = calcA.primitive <= calcB.primitive ? 1 : 0;

  // 2. L(C) = L(A) - L(B) - δ
  const subLevel = calcA.level - calcB.level - delta;

  // 3. Cálculo do Primitivo Resultante
  // P(C) = P(A) - P(B). Se for <= 0, somamos 9 para manter o ciclo 1-9.
  let subPrimitive = calcA.primitive - calcB.primitive;
  if (subPrimitive <= 0) {
    subPrimitive += 9;
  }

  const value = calcValue(subLevel, subPrimitive);

  return {
    value,
    level: subLevel,
    primitive: subPrimitive,
    delta,
  };
};

/**
 * Regra da Multiplicação:
 * L(C) = 9(L(A)*L(B)) + (L(A)*P(B)) + (L(B)*P(A)) + Transporte
 */
const calcMult = (a: number, b: number) => {
  const calcA = calcLevel(a);
  const calcB = calcLevel(b);

  // 1. Produto dos Primitivos
  const prodPrim = calcA.primitive * calcB.primitive;

  // 2. Cálculo do Primitivo Final P(C)
  const primitive = calcPrimitive(prodPrim);

  // 3. Cálculo do Transporte (Carry)
  // Regra: ⌊(P(A) * P(B)) / 9⌋.
  // Nota: Se for múltiplo de 9 e > 0, subtrai 1.
  const transporte = prodPrim > 0 ? Math.floor((prodPrim - 1) / 9) : 0;

  // 4. L(C) = 9(L(A) * L(B)) + (L(A) * P(B)) + (L(B) * P(A)) + Transporte
  const interaçãoNíveis = 9 * (calcA.level * calcB.level);
  const cruzamentoA = calcA.level * calcB.primitive;
  const cruzamentoB = calcB.level * calcA.primitive;

  const multLevel = interaçãoNíveis + cruzamentoA + cruzamentoB + transporte;

  const value = calcValue(multLevel, primitive);

  return {
    value,
    level: multLevel,
    primitive,
    transporte,
    interaçãoNíveis,
    cruzamentos: cruzamentoA + cruzamentoB,
  };
};

const estimarQuocientePorLevel = (dividendoVal: number, divisorVal: number) => {
  const dividendoEstruturado = calcLevel(dividendoVal);
  const divisorEstruturado = calcLevel(divisorVal);
  const blocoDezLevel = calcMult(divisorVal, 10).level;

  let quocienteEstimado = 0;
  let acumuladoLevel = 0;

  while (acumuladoLevel + blocoDezLevel <= dividendoEstruturado.level) {
    acumuladoLevel += blocoDezLevel;
    quocienteEstimado += 10;
  }

  while (
    acumuladoLevel + divisorEstruturado.level <=
    dividendoEstruturado.level
  ) {
    acumuladoLevel += divisorEstruturado.level;
    quocienteEstimado += 1;
  }

  return quocienteEstimado;
};

const ajustarQuocienteExato = (
  dividendoVal: number,
  divisorVal: number,
  quocienteEstimado: number,
) => {
  let quociente = quocienteEstimado;
  let produtoExato = calcMult(divisorVal, quociente).value;

  while (produtoExato > dividendoVal && quociente > 0) {
    quociente -= 1;
    produtoExato = calcMult(divisorVal, quociente).value;
  }

  while (calcMult(divisorVal, quociente + 1).value <= dividendoVal) {
    quociente += 1;
    produtoExato = calcMult(divisorVal, quociente).value;
  }

  return {quociente, produtoExato};
};

const montarQuocienteDecimal = (
  quocienteInteiro: number,
  restoInicialVal: number,
  divisorVal: number,
  precisao: number,
) => {
  if (precisao <= 0) return quocienteInteiro.toString();

  let resultado = `${quocienteInteiro}.`;
  let restoParaAmplificar = restoInicialVal;

  for (let i = 0; i < precisao; i += 1) {
    restoParaAmplificar = calcMult(restoParaAmplificar, 10).value;
    let digitoDecimal = 0;

    while (restoParaAmplificar >= divisorVal) {
      restoParaAmplificar -= divisorVal;
      digitoDecimal += 1;
    }

    resultado += digitoDecimal;
  }

  return resultado;
};

const calcDiv = (dividendoVal: number, divisorVal: number, precisao = 2) => {
  if (divisorVal === 0) return {error: 'Divisão por zero'};
  if (dividendoVal === 0)
    return {
      quociente: '0',
      inteiro: 0,
      restoFinal: {level: 0, primitive: 0, valor: 0},
    };

  const quocienteEstimado = estimarQuocientePorLevel(dividendoVal, divisorVal);
  const {quociente: quocienteInteiro, produtoExato} = ajustarQuocienteExato(
    dividendoVal,
    divisorVal,
    quocienteEstimado,
  );

  const restoInicialVal = dividendoVal - produtoExato;
  const restoFinal =
    restoInicialVal > 0
      ? {...calcLevel(restoInicialVal), valor: restoInicialVal}
      : {level: 0, primitive: 0, valor: 0};

  return {
    quociente: montarQuocienteDecimal(
      quocienteInteiro,
      restoInicialVal,
      divisorVal,
      precisao,
    ),
    inteiro: quocienteInteiro,
    restoFinal,
  };
};

export {
  calcLevel,
  calcValue,
  calcSum,
  calcPrimitive,
  calcSub,
  calcMult,
  calcDiv,
};
