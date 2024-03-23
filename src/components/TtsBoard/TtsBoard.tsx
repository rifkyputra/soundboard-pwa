import useTtsBoard from '@/store/ttsBoard';
import { Box, Grid, IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import { CancelPresentation, DeleteForever, Save, SaveAlt, VolumeUp } from '@mui/icons-material';
import useSituations from '@/store/situations';
import useModalManager from '@/store/modalManager';

const TtsBoard = () => {
  const [tts, action] = useTtsBoard();
  const [_, { saveSituation }] = useSituations();
  const [__, { openSituationModal }] = useModalManager();

  return (
    <Box
      height={200}
      width={'100%'}
      display={'flex'}
      alignItems={'left'}
      flexDirection={'row'}
      overflow={'auto'}
      gap={1}
      py={2}
      justifyContent={'space-between'}
    >
      <Grid container spacing={2}>
        <Grid item md={10}>
          <Box
            display={'flex'}
            flexDirection={'row'}
            overflow={'auto'}
            flex={9}
            gap={1}
            py={2}
            flexShrink={0}
            ml={3}
          >
            {tts.map((tts, index) => (
              <Box
                key={index}
                sx={{ border: '2px solid grey ' }}
                height={120}
                width={120}
                justifyContent={'space-between'}
                display={'flex'}
                alignItems={'center'}
                flexDirection={'column'}
              >
                <Box p={2} width={120}>
                  <Typography justifyItems={'center'}>{tts.name}</Typography>
                </Box>
                <IconButton
                  className="symbol-delete"
                  onClick={() => action.deleteFromTtsBoard(tts)}
                >
                  <CancelPresentation></CancelPresentation>
                </IconButton>
                {/* </Box> */}
              </Box>
            ))}
          </Box>
        </Grid>

        <Grid item md={2}>
          <Box
            display={'flex'}
            width={'100%'}
            height={'100%'}
            flexDirection={'row'}
            justifyContent={'center'}
            alignItems={'center'}
            alignContent={'center'}
            flex={1}
            mr={10}
          >
            <IconButton onClick={() => action.speakAll()}>
              <VolumeUp></VolumeUp>
            </IconButton>

            <IconButton onClick={() => openSituationModal()}>
              <Save></Save>
            </IconButton>

            <IconButton onClick={() => action.clearAll()}>
              <DeleteForever></DeleteForever>
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TtsBoard;
