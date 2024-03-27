import NavigationBar from '../../components/NavigationBar/NavigationBar';
import { Box, Card, IconButton, Typography } from '@mui/material';
import useSituations from '@/store/situations';
import GridColumnPadding from '@/layouts/BodyPadding';
import { VolumeUp, Delete } from '@mui/icons-material';
import Push from '@/components/Push/push';

type Props = {};

const Situations = (props: Props) => {
  const [situations, { speakSituation, deleteSituation }] = useSituations();
  return (
    <>
      <NavigationBar children={undefined}></NavigationBar>
      <GridColumnPadding>
        <Box>
          <h1> Situations </h1>

          <p> This is the Situations page. Here you can find all the situations you have saved. </p>
          <Box display={'flex'} flexDirection={'column'} gap={2}>
            {situations.length > 0 ? (
              situations.map((situation) => (
                <Card>
                  <Box display={'flex'} flexDirection={'row'} alignItems={'center'} px={3}>
                    <IconButton onClick={() => speakSituation(situation)}>
                      <VolumeUp></VolumeUp>
                    </IconButton>
                    <Box display={'flex'} flexDirection={'column'}>
                      <h2> {situation.name} </h2>
                      <p>{situation.symbols.map((v) => v.name).join(' ')}</p>
                    </Box>
                    <Push />
                    <p> {situation.description} </p>
                    <Box>
                      <IconButton onClick={() => deleteSituation(situation)}>
                        <Delete />
                      </IconButton>
                    </Box>
                  </Box>
                </Card>
              ))
            ) : (
              <Box
                sx={{
                  height: '60vh',
                }}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <Typography
                  sx={{
                    textAlign: 'center',
                    fontSize: '1.5rem',
                    color: 'gray',
                  }}
                >
                  There is no situation saved.
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </GridColumnPadding>
    </>
  );
};

export default Situations;
