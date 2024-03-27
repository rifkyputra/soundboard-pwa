import Box from '@mui/material/Box';
import { ReactNode } from 'react';
import { speak } from '@/utils/textToSpeech';
import Typography from '@mui/material/Typography';
import useTtsBoard from '@/store/ttsBoard';
import { ButtonBase, Card } from '@mui/material';
import useToggleEdit from '@/store/toggleEdit';
import { useSnackbar } from 'notistack';
import useSnackbarManager from '@/store/snackbar';

type Props = {
  symbol?: SymbolData;
  children?: ReactNode;
  onDelete?: () => void;
  onAddToPersonal?: () => void;
};

const SymbolItem = (props: Props) => {
  const [_, ttsAction] = useTtsBoard();
  const [isEdit, toggleEdit] = useToggleEdit();

  return (
    <Box display={'flex'} flexDirection={'column'}>
      <ButtonBase
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
            <Box display={'flex'} flexDirection={'column'}>
              <div className="symbol-text">
                <Typography fontSize={30} align="center">
                  {props?.symbol?.emoji}
                </Typography>
              </div>
              <div className="symbol-text">
                <Typography align="center">{props?.symbol?.name}</Typography>
              </div>
              {/* {props?.symbol?.description} */}
            </Box>
          </Box>
        </Card>
      </ButtonBase>
      <Box
        display={isEdit && (props.onAddToPersonal || props.onDelete) ? 'flex' : 'none'}
        flexDirection={'row'}
      >
        <Card
          variant="outlined"
          sx={{
            width: '100%',
          }}
        >
          <Box
            height={20}
            display="flex"
            flexDirection={'row'}
            alignItems="center"
            gap={2}
            p={2}
            justifyContent={'center'}
          >
            <ButtonBase onClick={props.onDelete}>
              <Box display={props.onDelete ? 'flex' : 'none'}>
                <div className="symbol-text">❌</div>
              </Box>
            </ButtonBase>

            <ButtonBase onClick={props.onAddToPersonal}>
              <Box display={props.onAddToPersonal ? 'flex' : 'none'}>
                <div className="symbol-text">➕</div>
              </Box>
            </ButtonBase>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default SymbolItem;
