const calcLevel = (value: number) => {
  if (value < 10) {
    return {level: 0, primitive: value};
  }

  const level = (value - 1) / 9;

  if (Number.isInteger(level)) {
    return {level, primitive: 1};
  }
  const changeLevel = level.toString().split('.')[1][0];
  const primitive = 1 + parseInt(changeLevel, 10);
  const newLevel = (value - primitive) / 9;
  return {level: newLevel, primitive};
};

export {calcLevel};
