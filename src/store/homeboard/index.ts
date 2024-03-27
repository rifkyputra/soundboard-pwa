import { atom, useRecoilState } from 'recoil';

import type { HomeboardAction } from './types';

const homeboardState = atom<SymbolData[]>({
  key: 'homeboard-state',
  default: [
    {
      id: '1',
      name: 'Saya',
      emoji: '👦',
    },
    {
      id: '2',
      name: 'Saya Ingin',
      emoji: '👦💪',
    },
    {
      id: '3',

      name: 'Saya Izin',
      emoji: '👦🙏',
    },
    {
      id: '4',
      name: 'Ayo Kita',
      emoji: '👦👧💪',
    },
    {
      id: '5',
      name: 'Apakah Kamu',
      emoji: '👦❓',
    },
    {
      id: '6',
      name: 'Sangat',
      emoji: '👍',
    },
    {
      id: '7',
      name: 'Ya',
      emoji: '👌',
    },
    {
      id: '8',
      name: 'Tidak',
      emoji: '👎',
    },
    {
      id: '9',
      name: 'Makan',
      emoji: '🍽️',
    },
    {
      id: '10',
      name: 'Minum',
      emoji: '🥤',
    },
    {
      id: '11',

      name: 'Tidur',
      emoji: '😴',
    },
    {
      id: '12',
      name: 'Mengantuk',
      emoji: '😪',
    },
    {
      id: '13',
      name: 'Lapar',
      emoji: '🍔',
    },
    {
      id: '14',
      name: 'Haus',
      emoji: '🥤',
    },
    {
      id: '15',
      name: 'Pergi',
      emoji: '🚶',
    },
    {
      id: '16',
      name: 'Pulang',
      emoji: '🏠',
    },
    {
      id: '17',
      name: 'Izin',
      emoji: '🙏',
    },
    {
      id: '18',
      name: 'ke toilet',
      emoji: '🚽',
    },
    {
      id: '19',
      name: 'Sakit',
      emoji: '🤒',
    },
  ],
});

function useHomeboard(): [SymbolData[], HomeboardAction] {
  const [homeboard, setHomeboard] = useRecoilState(homeboardState);
  return [homeboard, setHomeboard];
}

export default useHomeboard;
