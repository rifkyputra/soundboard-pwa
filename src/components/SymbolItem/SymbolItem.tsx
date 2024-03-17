import Box from '@mui/material/Box';
import { ReactNode } from 'react';
import { speak } from '@/utils/textToSpeech';
import Typography from '@mui/material/Typography';
import useTtsBoard from '@/store/ttsBoard';

type Props = {
  symbol?: SymbolData;
  children?: ReactNode;
  hasDelete?: boolean;
};

const SymbolItem = (props: Props) => {
  const [_, ttsAction] = useTtsBoard();

  return (
    <div
      onClick={() => {
        ttsAction.addToTtsBoard(props?.symbol!);
        speak({
          text: props?.symbol?.name ?? '',
          speechRate: 1,
        });
      }}
    >
      <Box
        height={200}
        width={200}
        my={4}
        display="flex"
        alignItems="center"
        gap={4}
        p={2}
        sx={{ border: '2px solid grey' }}
        justifyContent={'center'}
      >
        <Box display={'flex'}>
          <div className="symbol-text">
            <Typography align="center">{props?.symbol?.name}</Typography>
          </div>
          {/* {props?.symbol?.description} */}
        </Box>
      </Box>
    </div>
  );
};

export default SymbolItem;
