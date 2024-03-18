import useToggleEdit from '@/store/toggleEdit';
import { Router } from '@mui/icons-material';
import { Box, Button, Link } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
};

const NavigationBar = (props: Props) => {
  const [isEdit, action] = useToggleEdit();
  return (
    <Box
      display={'flex'}
      flexDirection={'row'}
      justifyContent={'space-between'}
      alignItems={'center'}
      p={2}
      borderBottom={'1px solid lightgrey'}
    >
      <Box
        display={'flex'}
        flexDirection={'row'}
        justifyContent={'flex-start'}
        alignItems={'center'}
        gap={2}
      >
        <Button variant={'text'}>
          <RouterLink to={'/'}>Home</RouterLink>
        </Button>

        <Button variant={'text'}>
          <RouterLink to={'/personal'}>Personal</RouterLink>
        </Button>

        <Button variant={'text'}>
          <RouterLink to={'/personal'}>Situations </RouterLink>
        </Button>
      </Box>
      <Box
        display={'flex'}
        flexDirection={'row'}
        justifyContent={'flex-start'}
        alignItems={'center'}
        gap={2}
      >
        <Button variant={'text'} onClick={() => action.toggleEdit()}>
          {isEdit ? <a>Done Edit</a> : <a>Edit Board</a>}
        </Button>

        <Button variant={'text'}>
          <RouterLink to={'/personal'}> Settings </RouterLink>
        </Button>
      </Box>
    </Box>
  );
};

export default NavigationBar;
