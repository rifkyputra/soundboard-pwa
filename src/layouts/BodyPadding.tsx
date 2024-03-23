import { Box, Grid } from '@mui/material';

type Props = {
  children?: React.ReactNode;
  mdSize?: number;
  smSize?: number;
};

function GridColumnPadding(props: Props) {
  return (
    <Grid
      container
      justifyContent={'center'}
      alignContent={'center'}
      alignItems={'center'}
      textAlign={'center'}
    >
      <Grid item md={props.mdSize ? props.mdSize : 8} xs={props.smSize ? props.smSize : 12}>
        <Box>{props.children}</Box>
      </Grid>
    </Grid>
  );
}

export function GridRowPadding(props: Props) {
  return (
    <Grid
      container
      direction={'row'}
      justifyContent={'center'}
      alignContent={'center'}
      alignItems={'center'}
      textAlign={'center'}
    >
      <Grid item md={props.mdSize ? props.mdSize : 8} xs={props.smSize ? props.smSize : 12}>
        <Box
          justifyContent={'center'}
          alignContent={'center'}
          alignItems={'center'}
          textAlign={'center'}
        >
          {props.children}
        </Box>
      </Grid>
    </Grid>
  );
}

export default GridColumnPadding;
