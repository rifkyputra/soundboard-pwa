import usePersonalboard from '@/store/personalboard';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { v4 } from 'uuid';

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
    emoji: '',
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
        backgroundColor: 'rgba(0,0,0,0.6)',
      }}
    >
      <Box>
        <Box sx={{ ...style, width: 400 }} bgcolor={'background.paper'} margin={'auto'} p={3}>
          <Typography id="server-modal-title" variant="h6" component="h2">
            Tambahkan Simbol Baru
          </Typography>
          <Typography id="server-modal-description" sx={{ pt: 2 }}>
            Isi data simbol dengan benar
          </Typography>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
              display: 'flex',
              flexDirection: 'column',
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="Name"
              label="Nama Simbol"
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
            <TextField
              id="Emojis"
              label="Emoji"
              variant="outlined"
              onChange={(v) =>
                setSymbolData((state) => {
                  return {
                    ...state,
                    emoji: v.target.value,
                  };
                })
              }
            />
            <Button
              variant="contained"
              onClick={() => {
                addToBoard({
                  id: v4(),
                  name: symbolData.name,
                  description: symbolData.description,
                  emoji: symbolData.emoji,
                });
                handleClose();
              }}
            >
              Save
            </Button>
          </Box>
          {children}
        </Box>
      </Box>
    </Modal>
  );
}

export default AddSymbolModal;
