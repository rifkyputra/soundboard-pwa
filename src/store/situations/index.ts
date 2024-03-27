import { speak } from '@/utils/textToSpeech';
import { useCallback, useMemo } from 'react';
import { atom, useRecoilState } from 'recoil';
import { AtomEffectParams } from '../types';

const situationsState = atom<SituationData[]>({
  key: 'situations',
  default: [],
  effects: [synchronizeWithLocalStorage],
});

function synchronizeWithLocalStorage({ setSelf, onSet }: AtomEffectParams) {
  const storedSituations = localStorage.getItem('situations');
  storedSituations && setSelf(JSON.parse(storedSituations));
  onSet((value: SituationData[]) => localStorage.setItem('situations', JSON.stringify(value)));
}

function useSituations(): [SituationData[], SituationActions] {
  const [situations, setSituations] = useRecoilState(situationsState);

  const speakSituation = useCallback(
    (value: SituationData) => {
      speak({
        text: value.symbols.map((v) => v.name).join(' ') ?? '',
        speechRate: 0.9,
      });
    },
    [setSituations],
  );

  const saveSituation = useCallback(
    (value: SituationData) => {
      setSituations((situations: SituationData[]) => [...situations, value]);
    },
    [setSituations],
  );

  const deleteSituation = useCallback(
    (value: SituationData) => {
      setSituations((situations: SituationData[]) =>
        situations.filter((situation) => situation.name !== value.name),
      );
    },
    [setSituations],
  );

  const memoizedActions = useMemo(
    () => ({ speakSituation, saveSituation, deleteSituation }),
    [speakSituation, saveSituation, deleteSituation],
  );

  return [situations, memoizedActions];
}

export default useSituations;
