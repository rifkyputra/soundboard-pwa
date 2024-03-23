import useModalManager from '@/store/modalManager';
import SaveSituationModal from './SaveSituationModal';
import AddSymbolModal from './AddSymbolModal';
import FeedbackModal from './FeedbackModal';

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

      {modal.isOpen && modal.modalKey === 'feedback' && (
        <FeedbackModal open={modal.isOpen} handleClose={closeModal} style={{}}></FeedbackModal>
      )}
    </>
  );
}

export default ModalRoot;
