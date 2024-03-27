import usePersonalboard from '@/store/personalboard';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useState } from 'react';

type Props = {
  open: boolean;
  handleClose: () => void;
  style: any;
  children?: React.ReactNode;
};

function AddSymbolModal({ open, handleClose, style, children }: Props) {
  const [symbolData, setSymbolData] = useState({
    name: '',
    description: '',
  });

  const [_, { addToBoard }] = usePersonalboard();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
      }}
    >
      <Box>
        <Box sx={{ ...style, width: 400 }} bgcolor={'background.paper'} margin={'auto'} p={3}>
          <Typography id="server-modal-title" variant="h6" component="h2">
            Berikan Feedback
          </Typography>
          <Typography id="server-modal-description" sx={{ pt: 2 }}>
            Saran Anda akan membantu kami untuk lebih baik lagi
          </Typography>
          <Box
            component="form"
            display={'flex'}
            flexDirection={'column'}
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="Name"
              label="Feedback"
              variant="outlined"
              onChange={(v) =>
                setSymbolData((state) => {
                  return {
                    ...state,
                    name: v.target.value,
                  };
                })
              }
            />
            <TextField
              id="Description"
              label="Deskripsi Simbol"
              variant="outlined"
              onChange={(v) =>
                setSymbolData((state) => {
                  return {
                    ...state,
                    description: v.target.value,
                  };
                })
              }
            />
            <Button
              variant="contained"
              onClick={() => {
                addToBoard({
                  name: symbolData.name,
                  description: symbolData.description,
                });
                handleClose();
              }}
            >
              Kirim
            </Button>
          </Box>
          {children}
        </Box>
      </Box>
    </Modal>
  );
}

export default AddSymbolModal;
