
import React from 'react';
import {
  List,
  ListItem,
  Link,
  Typography,
  Button,
  TextField,
} from '@material-ui/core';
import NextLink from 'next/link';
import Layout from '../components/Layout';
import useStyles from '../utils/styles';

export default function Login() {
  const styles = useStyles();
  return (
    <Layout title="Login">
      <form className={styles.form}>
        <Typography component="h1" variant="h1">
          Login
        </Typography>
        <List>
          <ListItem>
            <TextField
              variant="outlined"
              id="email"
              label="Email"
              fullWidth
              inputProps={{ type: 'email' }}
            />
          </ListItem>
          <ListItem>
            <TextField
              variant="outlined"
              id="password"
              label="Password"
              fullWidth
              inputProps={{ type: 'password' }}
            />
          </ListItem>
          <ListItem>
            <Button variant="contained" fullWidth color="primary" type="submit">
              Login
            </Button>
          </ListItem>
          <ListItem>
            Don&apos;t have an account? &nbsp;
            <NextLink href="register" passHref>
              <Link>Register</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}
