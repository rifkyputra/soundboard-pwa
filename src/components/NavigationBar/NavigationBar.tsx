import useOrientation from '@/hooks/useOrientation';
import useToggleEdit from '@/store/toggleEdit';
import { Router } from '@mui/icons-material';
import {
  Box,
  Button,
  Link,
  IconButton,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import useToggleMobileMenu from '@/store/toggleMobileMenu';
import DefaultIcon from '@mui/icons-material/Deblur';
import ListItemButton from '@mui/material/ListItemButton';

type Props = {
  children: React.ReactNode;
};

const NavigationBar = (props: Props) => {
  const [isEdit, action] = useToggleEdit();
  const [isMobileMenuOpen, { toggleMobileMenu }] = useToggleMobileMenu();

  const isPotrait = useOrientation();
  return (
    <Box
      display={'flex'}
      flexDirection={'row'}
      justifyContent={'space-between'}
      alignItems={'center'}
      p={2}
      borderBottom={'1px solid lightgrey'}
    >
      {isPotrait ? (
        <>
          <IconButton onClick={() => toggleMobileMenu()}>
            <MenuIcon> </MenuIcon>
          </IconButton>
        </>
      ) : (
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
            <RouterLink to={'/situations'}>Situations </RouterLink>
          </Button>
        </Box>
      )}
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
          <RouterLink to={'/settings'}> Settings </RouterLink>
        </Button>
      </Box>

      <SwipeableDrawer
        anchor="left"
        open={isMobileMenuOpen}
        onClose={toggleMobileMenu}
        onOpen={toggleMobileMenu}
        disableBackdropTransition={false}
        swipeAreaWidth={30}
        data-pw="sidebar"
      >
        <List sx={{ width: 250, pt: (theme) => `${theme.mixins.toolbar.minHeight}px` }}>
          {Object.values([
            {
              title: 'Personal',
              path: '/personal',
              icon: DefaultIcon,
            },
            {
              title: 'Situations',
              path: '/situations',
              icon: DefaultIcon,
            },
          ])
            .filter((route) => route.title)
            .map(({ path, title, icon: Icon }) => (
              <ListItem sx={{ p: 0 }} key={path}>
                <ListItemButton>
                  <ListItemIcon>{Icon ? <Icon /> : <DefaultIcon />}</ListItemIcon>
                  <Link>
                    <RouterLink to={path}>{title} </RouterLink>{' '}
                  </Link>
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      </SwipeableDrawer>
    </Box>
  );
};

export default NavigationBar;
