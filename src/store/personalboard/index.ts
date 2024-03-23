import { atom, useRecoilState } from 'recoil';

import type { personalboardAction } from './types';
import { useCallback, useMemo } from 'react';

const personalboardState = atom<SymbolData[]>({
  key: 'personalboard-state',
  default: [],
});

function usePersonalboard(): [SymbolData[], personalboardAction] {
  const [personalboard, setpersonalboard] = useRecoilState(personalboardState);

  const addToBoard = useCallback(
    (value: SymbolData) => {
      setpersonalboard((personalboard: SymbolData[]) => [...personalboard, value]);
    },
    [setpersonalboard],
  );

  const useMemoizedActions = useMemo(() => ({ addToBoard }), [addToBoard]);

  return [personalboard, useMemoizedActions];
}

export default usePersonalboard;
