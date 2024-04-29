import React, {useState} from 'react';

import {buildNumbers} from 'shared/utils/buildNumbers';

import * as S from './styles';

const Home: React.FC = () => {
  const [state, setState] = useState<number[]>();
  return (
    <S.Container>
      Gerar numero
      <S.Button
        onClick={() => {
          setState(buildNumbers(100));
        }}>
        Gerar
      </S.Button>
      {state?.map(item => <div key={item}>{item}</div>)}
    </S.Container>
  );
};

export default Home;
