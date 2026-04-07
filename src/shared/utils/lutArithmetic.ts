// Tabela de Primitivos (P)
const PRIMITIVE_LUT = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [2, 4, 6, 8, 1, 3, 5, 7, 9],
  [3, 6, 9, 3, 6, 9, 3, 6, 9],
  [4, 8, 3, 7, 2, 6, 1, 5, 9],
  [5, 1, 6, 2, 7, 3, 8, 4, 9],
  [6, 3, 9, 6, 3, 9, 6, 3, 9],
  [7, 5, 3, 1, 8, 6, 4, 2, 9],
  [8, 7, 6, 5, 4, 3, 2, 1, 9],
  [9, 9, 9, 9, 9, 9, 9, 9, 9],
];

// Tabela de Transporte (T) com a regra do 9* (7)
const TRANSPORT_LUT = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 1, 1],
  [0, 0, 1, 1, 1, 2, 2, 2, 2],
  [0, 0, 1, 1, 2, 2, 3, 3, 3],
  [0, 1, 1, 2, 2, 3, 3, 4, 4],
  [0, 1, 2, 2, 3, 4, 4, 5, 5],
  [0, 1, 2, 3, 3, 4, 5, 6, 6],
  [0, 1, 2, 3, 4, 5, 6, 7, 7],
  [0, 1, 2, 3, 4, 5, 6, 7, 7], // 9x9 transporte 7 (sua regra)
];

export const getLutValues = (pa: number, pb: number) => {
  // Ajuste de índice (1-9 para 0-8)
  const row = pa - 1;
  const col = pb - 1;

  return {
    primitive: PRIMITIVE_LUT[row][col],
    transport: TRANSPORT_LUT[row][col],
  };
};
