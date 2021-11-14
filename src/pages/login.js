import axios from 'axios';
import React, { useState } from 'react';
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post('/api/users/login', {email, password})
      alert('success login', data)
    } catch (error) {
      alert(error.response.data ? error.response.data.message : error.message)
    }
  }
  const styles = useStyles();
  return (
    <Layout title="Login">
      <form onSubmit={submitHandler} className={styles.form}>
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
              onChange={(e) => setEmail(e.target.value)}
            />
          </ListItem>
          <ListItem>
            <TextField
              variant="outlined"
              id="password"
              label="Password"
              fullWidth
              inputProps={{ type: 'password' }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </ListItem>
          <ListItem>
            <Button variant="contained" fullWidth color="primary" type="submit">
              Login
            </Button>
          </ListItem>
          <ListItem>
            Don&apos;t have an account? &nbsp;
            <NextLink href="/register" passHref>
              <Link>Register</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}
