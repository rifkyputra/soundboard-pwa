import Box from '@mui/material/Box';
import { ReactNode } from 'react';
import { speak } from '@/utils/textToSpeech';
import Typography from '@mui/material/Typography';
import useTtsBoard from '@/store/ttsBoard';
import { Card } from '@mui/material';

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
      <Card variant="outlined">
        <Box
          height={200}
          width={200}
          display="flex"
          alignItems="center"
          gap={4}
          p={2}
          justifyContent={'center'}
        >
          <Box display={'flex'}>
            <div className="symbol-text">
              <Typography align="center">{props?.symbol?.name}</Typography>
            </div>
            {/* {props?.symbol?.description} */}
          </Box>
        </Box>
      </Card>
    </div>
  );
};

export default SymbolItem;
