import { atom, useRecoilState } from 'recoil';
import { useMemo } from 'react';

type ModalOpenState = {
  isOpen: boolean;
  modalKey?: string;
};

const modalState = atom<ModalOpenState>({
  key: 'modal-state',
  default: {
    isOpen: false,
  },
});

function useModalManager(): [ModalOpenState, ModalManagerAction] {
  const [modal, setModal] = useRecoilState(modalState);

  const openModal = (value: string) => {
    closeAllModals();
    setModal({ isOpen: true, modalKey: value });
  };

  const openSituationModal = () => {
    closeAllModals();
    setModal({
      isOpen: true,
      modalKey: 'saveSituation',
    });
  };

  const openAddSymbolModal = () => {
    closeAllModals();
    setModal({
      isOpen: true,
      modalKey: 'addSymbol',
    });
  };

  const closeModal = () => {
    setModal({ isOpen: false });
  };

  const closeAllModals = () => {
    setModal({ isOpen: false });
  };

  const useMemoizedActions = useMemo(
    () => ({
      openModal,
      closeModal,
      closeAllModals,
      openSituationModal,
      openAddSymbolModal,
    }),
    [openModal, closeModal, closeAllModals, openSituationModal, openAddSymbolModal],
  );

  return [modal, useMemoizedActions];
}

export default useModalManager;
