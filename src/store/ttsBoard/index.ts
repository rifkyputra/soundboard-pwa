import { atom, useRecoilState } from 'recoil';
import { useCallback, useMemo } from 'react';
import { AtomEffectParams } from '../types';
import { speak } from '@/utils/textToSpeech';

const ttsBoardState = atom<SymbolData[]>({
  key: 'tts-board-state',
  default: [],
  effects: [updateValue],

  // effects: [addToTtsBoard]
});

function updateValue({ setSelf, onSet }: AtomEffectParams) {
  const storedTtsBoard = localStorage.getItem('tts-board');
  console.log('storedTtsBoard', storedTtsBoard);
  storedTtsBoard && setSelf(JSON.parse(storedTtsBoard));
  onSet((value: SymbolData[]) => localStorage.setItem('tts-board', JSON.stringify(value)));
}

type ttsActions = {
  addToTtsBoard: (value: SymbolData) => void;
  deleteFromTtsBoard: (value: SymbolData) => void;
  clearAll: () => void;
  speakAll: () => void;
};

function useTtsBoard(): [SymbolData[], ttsActions] {
  const [ttsBoard, setTtsBoard] = useRecoilState(ttsBoardState);

  const addToTtsBoard = useCallback(
    (value: SymbolData) => {
      setTtsBoard((ttsBoard: SymbolData[]) => [...ttsBoard, value]);
    },
    [setTtsBoard],
  );

  const deleteFromTtsBoard = useCallback(
    (value: SymbolData) => {
      console.log('deleteFromTtsBoard', value);
      setTtsBoard((ttsBoard: SymbolData[]) => ttsBoard.filter((tts) => tts.name !== value.name));
    },
    [setTtsBoard],
  );

  const clearAll = useCallback(() => {
    setTtsBoard([]);
  }, [setTtsBoard]);

  const speakAll = useCallback(() => {
    ttsBoard.forEach((tts) => {
      speak({
        text: tts.name ?? '',
        speechRate: 1,
      });
    });
  }, [ttsBoard]);

  // const ttsBoard = useRecoilValue(ttsBoardState);

  const memoizedActions = useMemo(
    () => ({ addToTtsBoard, deleteFromTtsBoard, clearAll, speakAll }),
    [addToTtsBoard, deleteFromTtsBoard, clearAll, speakAll],
  );

  return [ttsBoard, memoizedActions];
}

export default useTtsBoard;
