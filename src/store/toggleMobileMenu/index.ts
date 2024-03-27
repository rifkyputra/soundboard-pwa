import { useCallback } from 'react';
import { atom, useRecoilState } from 'recoil';
import { toggleMobileMenuActions } from './types';

const toggleMobileMenuState = atom({
  key: 'toggle-mobile-menu-state',
  default: false,
});

function useToggleMobileMenu(): [boolean, toggleMobileMenuActions] {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useRecoilState(toggleMobileMenuState);

  const toggleMobileMenu = useCallback(
    (open?: boolean) => {
      setIsMobileMenuOpen((isMobileMenuOpen: boolean) => open ?? !isMobileMenuOpen);
    },
    [setIsMobileMenuOpen],
  );

  return [isMobileMenuOpen, { toggleMobileMenu }];
}

export default useToggleMobileMenu;
