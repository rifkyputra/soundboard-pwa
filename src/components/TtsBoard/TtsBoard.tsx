import useTtsBoard from '@/store/ttsBoard';
import { Box, Card, Grid, IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import { CancelPresentation, DeleteForever, Save, SaveAlt, VolumeUp } from '@mui/icons-material';
import useSituations from '@/store/situations';
import useModalManager from '@/store/modalManager';

const TtsBoard = () => {
  const [tts, action] = useTtsBoard();
  const [_, { saveSituation }] = useSituations();
  const [__, { openSituationModal }] = useModalManager();

  return (
    <Box marginTop={5} marginBottom={5}>
      <Card variant="outlined">
        <Box
          width={'100%'}
          minHeight={200}
          display={'flex'}
          alignItems={'left'}
          flexDirection={'row'}
          overflow={'auto'}
          gap={1}
          // py={2}
          justifyContent={'space-between'}
          bgcolor={'background.paper'}
        >
          <Grid container spacing={2}>
            <Grid item md={9} xs={12}>
              <Box
                display={'flex'}
                flexDirection={'row'}
                overflow={'auto'}
                flex={9}
                gap={1}
                py={2}
                flexShrink={0}
                ml={3}
                minWidth={200}
              >
                {tts.map((tts, index) => (
                  <Box
                    key={index}
                    sx={{ border: '2px solid #b8b8b8 ' }}
                    height={155}
                    width={120}
                    justifyContent={'space-between'}
                    display={'flex'}
                    alignItems={'center'}
                    flexDirection={'column'}
                  >
                    <div className="symbol-text">
                      <Typography fontSize={30} align="center">
                        {tts.emoji}
                      </Typography>
                    </div>
                    <Box p={2} width={120} height={40} fontSize={12} textOverflow={'ellipsis'}>
                      <Typography justifyItems={'center'}>{tts.name}</Typography>
                    </Box>
                    <IconButton
                      className="symbol-delete"
                      onClick={() => action.deleteFromTtsBoard(tts, index)}
                    >
                      <CancelPresentation></CancelPresentation>
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </Grid>

            <Grid item md={3} xs={12} bgcolor={'background.board'}>
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
                  <Box
                    borderRadius={'50%'}
                    padding={1}
                    bgcolor={'primary.main'}
                    margin={'auto'}
                    display={'flex'}
                    justifyItems={'center'}
                    width={'3rem'}
                    height={'3rem'}
                    justifyContent={'center'}
                    alignItems={'center'}
                  >
                    <VolumeUp sx={{ color: '#fff', fontSize: 25 }}></VolumeUp>
                  </Box>
                </IconButton>

                <IconButton onClick={() => openSituationModal()}>
                  <Box
                    borderRadius={'50%'}
                    padding={1}
                    bgcolor={'primary.main'}
                    margin={'auto'}
                    display={'flex'}
                    justifyItems={'center'}
                    width={'3rem'}
                    height={'3rem'}
                    justifyContent={'center'}
                    alignItems={'center'}
                  >
                    <Save sx={{ color: '#fff', fontSize: 25 }}></Save>
                  </Box>
                </IconButton>

                <IconButton onClick={() => action.clearAll()}>
                  <Box
                    borderRadius={'50%'}
                    padding={1}
                    bgcolor={'primary.main'}
                    margin={'auto'}
                    display={'flex'}
                    justifyItems={'center'}
                    width={'3rem'}
                    height={'3rem'}
                    justifyContent={'center'}
                    alignItems={'center'}
                  >
                    <DeleteForever sx={{ color: '#fff', fontSize: 25 }}></DeleteForever>
                  </Box>
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Box>
  );
};

export default TtsBoard;
