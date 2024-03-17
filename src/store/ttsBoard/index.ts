import { atom, useRecoilState } from 'recoil';
import { useCallback, useMemo } from 'react';

const ttsBoardState = atom<SymbolData[]>({
  key: 'tts-board-state',
  default: [],

  // effects: [addToTtsBoard]
});

// function addToTtsBoard({ setSelf, onSet }: AtomEffectParams) {
//     const storedTtsBoard = localStorage.getItem('tts-board');
//     storedTtsBoard && setSelf(storedTtsBoard);
//     onSet((value: SymbolData) => localStorage.setItem('tts-board', appendDataToJson<SymbolData>(storedTtsBoard!, value)));
// }

type ttsActions = {
  addToTtsBoard: (value: SymbolData) => void;
};

function useTtsBoard(): [SymbolData[], ttsActions] {
  const [ttsBoard, setTtsBoard] = useRecoilState(ttsBoardState);

  const addToTtsBoard = useCallback(
    (value: SymbolData) => {
      setTtsBoard((ttsBoard: SymbolData[]) => [...ttsBoard, value]);
    },
    [setTtsBoard],
  );

  // const ttsBoard = useRecoilValue(ttsBoardState);

  const memoizedActions = useMemo(() => ({ addToTtsBoard }), [addToTtsBoard]);

  return [ttsBoard, memoizedActions];
}

export default useTtsBoard;
