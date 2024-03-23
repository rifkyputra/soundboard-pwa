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
import GridColumnPadding, { GridRowPadding } from '@/layouts/BodyPadding';
import { FlexBox } from '../styled';
import Push from '../Push/push';

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
        <>
          <GridRowPadding mdSize={10}>
            <Box display={'flex'}>
              <FlexBox flexDirection={'row'} justifyContent={'flex-start'} gap={2}>
                <Button variant={'text'}>
                  <RouterLink to={'/'}>Home</RouterLink>
                </Button>

                <Button variant={'text'}>
                  <RouterLink to={'/personal'}>Personal</RouterLink>
                </Button>

                <Button variant={'text'}>
                  <RouterLink to={'/situations'}>Situations </RouterLink>
                </Button>
              </FlexBox>

              <Push />

              <Box display={'flex'} flexDirection={'row'} gap={2}>
                {/* <Button variant={'text'} onClick={() => action.toggleEdit()}>
                  {isEdit ? <a>Done Edit</a> : <a>Edit Board</a>}
                </Button> */}

                <Button variant={'text'}>
                  <RouterLink to={'/settings'}> Settings </RouterLink>
                </Button>
              </Box>
            </Box>
          </GridRowPadding>
        </>
      )}

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
