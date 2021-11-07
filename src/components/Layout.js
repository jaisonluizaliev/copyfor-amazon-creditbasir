import React, { useContext } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Link,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Switch,
  Badge,
} from '@material-ui/core';
import useStyles from '../utils/styles';
import { Store, actionTypes } from '../utils/Store';
import Cookies from 'js-cookie';

export default function Layout({ children, title, description }) {
  const { state, dispatch } = useContext(Store);
  const { darkMode, cart } = state;
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: '1.6rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      h2: {
        fontSize: '1.4rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
    },
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: '#f0c000',
      },
      secondary: {
        main: '#208080',
      },
    },
  });
  const styles = useStyles();

  function darkModeHandler() {
    dispatch({
      type: darkMode ? actionTypes.DARK_MODE_OFF : actionTypes.DARK_MODE_ON,
    });
    const newDarkMode = !darkMode;
    Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF');
  }

  return (
    <div>
      <Head>
        <title>{title ? `${title} ||` : ''} Jailson (Amazona) </title>
        {description && <meta name="description" content={description} />}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" className={styles.navbar}>
          <Toolbar>
            <NextLink href="/" passHref>
              <Link>
                <Typography className={styles.brand}>amazona</Typography>
              </Link>
            </NextLink>
            <div className={styles.grow} />
            <Switch checked={darkMode} onChange={darkModeHandler} />
            <NextLink href="/cart" passHref>
              <Link>
                <Typography>
                  {cart.cartItems.length > 0 ? (
                    <Badge
                      color="secondary"
                      badgeContent={cart.cartItems.length}
                    >
                      Cart
                    </Badge>
                  ) : (
                    'Cart' 
                  )}
                </Typography>
              </Link>
            </NextLink>
            <NextLink href="/login" passHref>
              <Link>
                <Typography>Login</Typography>
              </Link>
            </NextLink>
          </Toolbar>
        </AppBar>
        <Container className={styles.main}>{children}</Container>
        <footer>
          <Typography className={styles.footer}>
            All Rights Reserved, Jailson Amazona
          </Typography>
        </footer>
      </ThemeProvider>
    </div>
  );
}
