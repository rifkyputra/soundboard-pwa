type ModalManagerAction = {
  openModal: (value: string) => void;
  openSituationModal: () => void;
  openAddSymbolModal: () => void;
  closeModal: () => void;
  closeAllModals: () => void;
};
