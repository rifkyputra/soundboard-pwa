import useOrientation from '@/hooks/useOrientation';
import useToggleEdit from '@/store/toggleEdit';
import { Router, Settings } from '@mui/icons-material';
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
import { Link as RouterLink, useRoutes } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import useToggleMobileMenu from '@/store/toggleMobileMenu';
import DefaultIcon from '@mui/icons-material/Deblur';
import ListItemButton from '@mui/material/ListItemButton';
import GridColumnPadding, { GridRowPadding } from '@/layouts/BodyPadding';
import { FlexBox } from '../styled';
import Push from '../Push/push';
import Situations from '../../pages/Situations/index';
import Typography from '@mui/material/Typography';
import routes from '@/routes';

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
          <Link component={RouterLink} to={'/'}>
            <Button variant={'text'}>
              <Typography fontSize={'1.5rem'} fontWeight={'bold'}>
                Soundboard AAC
              </Typography>
            </Button>
          </Link>
        </>
      ) : (
        <>
          <GridRowPadding mdSize={10}>
            <Box display={'flex'}>
              <FlexBox
                flexDirection={'row'}
                justifyContent={'flex-start'}
                alignItems={'center'}
                gap={2}
              >
                <Link component={RouterLink} to={'/'}>
                  <Button variant={'text'}>
                    <Typography fontSize={'1.5rem'} fontWeight={'bold'}>
                      Soundboard AAC
                    </Typography>
                  </Button>
                </Link>

                <Link component={RouterLink} to={'/personal'}>
                  <Button variant={'text'}>Personal</Button>
                </Link>

                <Link component={RouterLink} to={'/situations'}>
                  <Button variant={'text'}>Situations</Button>
                </Link>
              </FlexBox>

              <Push />

              <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={2}>
                <Button variant={'text'} onClick={() => action.toggleEdit()}>
                  {isEdit ? <a>Done Edit</a> : <a>Edit Board</a>}
                </Button>

                <Link component={RouterLink} to={'/settings'}>
                  {' '}
                  <Button variant={'text'}>Settings </Button>
                </Link>
              </Box>
            </Box>
          </GridRowPadding>
        </>
      )}

      <SwipeableDrawer
        anchor="left"
        open={isMobileMenuOpen}
        onClose={() => toggleMobileMenu(false)}
        onOpen={() => toggleMobileMenu()}
        disableBackdropTransition={false}
        swipeAreaWidth={30}
        data-pw="sidebar"
      >
        <List sx={{ width: 250, pt: (theme) => `${theme.mixins.toolbar.minHeight}px` }}>
          {Object.values([
            {
              title: 'Home',
              path: '/',
              icon: DefaultIcon,
            },
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
            {
              title: 'Settings',
              path: '/settings',
              icon: Settings,
            },
          ])
            .filter((route) => route.title)
            .map(({ path, title, icon: Icon }) => (
              <ListItem sx={{ p: 0 }} key={path}>
                <ListItemButton>
                  <ListItemIcon>{Icon ? <Icon /> : <DefaultIcon />}</ListItemIcon>
                  <Link onClick={() => toggleMobileMenu(false)}>
                    <Link component={RouterLink} to={path}>
                      {title}{' '}
                    </Link>{' '}
                  </Link>
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      </SwipeableDrawer>
      {isPotrait ? (
        <Button variant={'text'} onClick={() => action.toggleEdit()}>
          {isEdit ? <a>Done Edit</a> : <a>Edit Board</a>}
        </Button>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default NavigationBar;
