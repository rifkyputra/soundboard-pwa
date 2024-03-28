import { useCallback, useMemo } from 'react';
import { atom, useRecoilState } from 'recoil';
import en from './en-dict';
import id from './id-dict';

type locale = {
  locale: string;
  dict: Object;
};

const i18nState = atom<locale>({
  key: 'i18n',
  default: {
    locale: 'en',
    dict: en,
  },
});

function usei18n(): [locale, i18nLocaleAction] {
  const [locale, setLocale] = useRecoilState(i18nState);

  const en = useCallback(() => {
    setLocale({
      locale: 'en',
      dict: en,
    });
  }, [setLocale]);

  const id = useCallback(() => {
    setLocale({
      locale: 'id',
      dict: id,
    });
  }, [setLocale]);

  const memoizedActions = useMemo(
    () => ({
      en,
      id,
    }),
    [en, id],
  );

  return [locale, memoizedActions];
}

export default usei18n;
