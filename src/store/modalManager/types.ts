type ModalManagerAction = {
  openModal: (value: string) => void;
  openSituationModal: () => void;
  openAddSymbolModal: () => void;
  openFeedbackModal: () => void;
  closeModal: () => void;
  closeAllModals: () => void;
};
