import { atom, useRecoilState } from 'recoil';

import type { personalboardAction } from './types';
import { useCallback } from 'react';

const personalboardState = atom<SymbolData[]>({
  key: 'personalboard-state',
  default: [],
});

function usePersonalboard(): [SymbolData[], personalboardAction] {
  const [personalboard, setpersonalboard] = useRecoilState(personalboardState);

  const addToBoard = (value: SymbolData) =>
    useCallback(() => {
      setpersonalboard((personalboard: SymbolData[]) => [...personalboard, value]);
    }, [setpersonalboard]);

  return [personalboard, { addToBoard }];
}

export default usePersonalboard;
