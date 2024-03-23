import { speak } from '@/utils/textToSpeech';
import { useCallback, useMemo } from 'react';
import { atom, useRecoilState } from 'recoil';

const situationsState = atom<SituationData[]>({
  key: 'situations',
  default: [
    {
      name: 'Situation 1',
      description: 'This is the first situation',
      symbols: [
        {
          name: 'Symbol 1',
          description: 'This is the first symbol',
        },
        {
          name: 'Symbol 2',
          description: 'This is the second symbol',
        },
      ],
    },
  ],
});

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
