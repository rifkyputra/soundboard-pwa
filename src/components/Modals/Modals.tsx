import useModalManager from '@/store/modalManager';
import SaveSituationModal from './SaveSituationModal';
import AddSymbolModal from './AddSymbolModal';

function ModalRoot() {
  const [modal, { closeModal }] = useModalManager();
  //   const modals = {
  //     "saveSituation": <SaveSituationModal></SaveSituationModal>,

  //   }

  return (
    <>
      {modal.isOpen && modal.modalKey === 'saveSituation' && (
        <SaveSituationModal
          open={modal.isOpen}
          handleClose={closeModal}
          style={{}}
        ></SaveSituationModal>
      )}

      {modal.isOpen && modal.modalKey === 'addSymbol' && (
        <AddSymbolModal open={modal.isOpen} handleClose={closeModal} style={{}}></AddSymbolModal>
      )}
    </>
  );
}

export default ModalRoot;
