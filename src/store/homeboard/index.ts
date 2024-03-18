import { atom, useRecoilState } from 'recoil';

import type { HomeboardAction } from './types';

const homeboardState = atom<SymbolData[]>({
  key: 'homeboard-state',
  default: [
    {
      name: 'Saya',
    },
    {
      name: 'Saya Ingin',
    },
    {
      name: 'Saya Izin',
    },
    {
      name: 'Ayo Kita',
    },
    {
      name: 'Apakah Kamu',
    },
    {
      name: 'Sangat',
    },
    {
      name: 'Ya',
    },
    {
      name: 'Tidak',
    },
    {
      name: 'Makan',
    },
    {
      name: 'Minum',
    },
    {
      name: 'Tidur',
    },
    {
      name: 'Mengantuk',
    },
    {
      name: 'Lapar',
    },
    {
      name: 'Haus',
    },
    {
      name: 'Pergi',
    },
    {
      name: 'Pulang',
    },
    {
      name: 'Izin',
    },
    {
      name: 'ke toilet',
    },
    {
      name: 'Sakit',
    },
  ],
});

function useHomeboard(): [SymbolData[], HomeboardAction] {
  const [homeboard, setHomeboard] = useRecoilState(homeboardState);
  return [homeboard, setHomeboard];
}

export default useHomeboard;
