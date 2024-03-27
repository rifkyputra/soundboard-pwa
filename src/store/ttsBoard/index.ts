import { atom, useRecoilState } from 'recoil';
import { useCallback, useMemo } from 'react';
import { AtomEffectParams } from '../types';
import { speak } from '@/utils/textToSpeech';

const ttsBoardState = atom<SymbolData[]>({
  key: 'tts-board-state',
  default: [],
  effects: [updateValue],
});

function updateValue({ setSelf, onSet }: AtomEffectParams) {
  const storedTtsBoard = localStorage.getItem('tts-board');
  console.log('storedTtsBoard', storedTtsBoard);
  storedTtsBoard && setSelf(JSON.parse(storedTtsBoard));
  onSet((value: SymbolData[]) => localStorage.setItem('tts-board', JSON.stringify(value)));
}

function useTtsBoard(): [SymbolData[], ttsActions] {
  const [ttsBoard, setTtsBoard] = useRecoilState(ttsBoardState);

  const addToTtsBoard = useCallback(
    (value: SymbolData) => {
      setTtsBoard((ttsBoard: SymbolData[]) => [...ttsBoard, value]);
    },
    [setTtsBoard],
  );

  const deleteFromTtsBoard = useCallback(
    (value: SymbolData, index: number) => {
      setTtsBoard((ttsBoard: SymbolData[]) => [
        ...ttsBoard.slice(0, index),
        ...ttsBoard.slice(index + 1),
      ]);
    },
    [setTtsBoard],
  );

  const clearAll = useCallback(() => {
    setTtsBoard([]);
  }, [setTtsBoard]);

  const speakAll = useCallback(() => {
    speak({
      text: ttsBoard.map((v) => v.name).join(' ') ?? '',
      speechRate: 0.9,
    });
  }, [ttsBoard]);

  const memoizedActions = useMemo(
    () => ({ addToTtsBoard, deleteFromTtsBoard, clearAll, speakAll }),
    [addToTtsBoard, deleteFromTtsBoard, clearAll, speakAll],
  );

  return [ttsBoard, memoizedActions];
}

export default useTtsBoard;
