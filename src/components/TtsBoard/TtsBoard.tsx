import useTtsBoard from '@/store/ttsBoard';
import { Box, IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import { CancelPresentation } from '@mui/icons-material';

const TtsBoard = () => {
  const [tts, action] = useTtsBoard();

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
      flexShrink={0}
    >
      {tts.map((tts, index) => (
        <Box
          key={index}
          sx={{ border: '2px solid grey' }}
          height={120}
          width={120}
          justifyContent={'center'}
          display={'flex'}
          alignItems={'center'}
          flexDirection={'column'}
        >
          <Box p={2}>
            <Typography justifyItems={'center'}>{tts.name}</Typography>
          </Box>
          {/* <Box alignSelf={'flex-end'}> */}
          <IconButton className="symbol-delete" onClick={() => action.deleteFromTtsBoard(tts)}>
            <CancelPresentation></CancelPresentation>
          </IconButton>
          {/* </Box> */}
        </Box>
      ))}

      <Box>
        <IconButton onClick={() => action.clearAll()}>Clear All</IconButton>
        <IconButton onClick={() => action.speakAll()}>Speak All</IconButton>
      </Box>
    </Box>
  );
};

export default TtsBoard;
