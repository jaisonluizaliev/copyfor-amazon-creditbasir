import {
  Button,
  Card,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from '@material-ui/core';
import NextLink from 'next/link';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import { actionTypes, Store } from '../utils/Store';
import useStyles from '../utils/styles';
import { Controller, useForm } from 'react-hook-form';
import Cookies from 'js-cookie';

function Profile() {
  const { state, dispatch } = useContext(Store);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  const styles = useStyles();

  const router = useRouter();

  const { userInfo } = state;

  useEffect(() => {
    if (!userInfo) {
      return router.push('/login');
    }
    setValue('name', userInfo.name);
    setValue('email', userInfo.email);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitHandler = async ({ name, email, password, confirmPassword }) => {
    // closeSnackbar();
    if (password !== confirmPassword) {
      alert("Password isn't match", { variant: 'error' });
      return;
    }

    try {
      const { data } = await axios.put(
        '/api/users/profile',
        {
          name,
          email,
          password,
        },
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: actionTypes.USER_LOGIN, payload: data });
      Cookies.set('userInfo', JSON.stringify(data));
      alert('Profile updated successfully');
    } catch (error) {
      alert(error.response.data ? error.response.data.message : error.message, {
        error,
      });
      return;
    }
  };

  return (
    <Layout title="Profile">
      <br />
      <Grid container spacing={1}>
        <Grid item md={3} xs={12}>
          <Card className={styles.section}>
            <List>
              <NextLink href="/profile" passHref>
                <ListItem button component="a">
                  <ListItemText selected primary="User Profile"></ListItemText>
                </ListItem>
              </NextLink>
              <NextLink href="/order-history" passHref>
                <ListItem button component="a">
                  <ListItemText primary="Order History"></ListItemText>
                </ListItem>
              </NextLink>
            </List>
          </Card>
        </Grid>
        <Grid item md={9} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Typography component="h1" variant="h1">
                  Profile
                </Typography>
              </ListItem>
              <ListItem>
                <form
                  onSubmit={handleSubmit(submitHandler)}
                  className={styles.form}
                >
                  <List>
                    <ListItem>
                      <Controller
                        name="name"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: true,
                          minLength: 2,
                        }}
                        render={({ field }) => (
                          <TextField
                            variant="outlined"
                            fullWidth
                            id="name"
                            label="Name"
                            inputProps={{ type: 'text' }}
                            error={Boolean(errors.name)}
                            helperText={
                              errors.name
                                ? errors.name.type === 'minLength'
                                  ? 'Name Length is more than 1'
                                  : 'Name is Required'
                                : ''
                            }
                            {...field}
                          />
                        )}
                      />
                    </ListItem>
                    <ListItem>
                      <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: true,
                          pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                        }}
                        render={({ field }) => (
                          <TextField
                            variant="outlined"
                            fullWidth
                            id="email"
                            label="Email"
                            inputProps={{ type: 'email' }}
                            error={Boolean(errors.email)}
                            helperText={
                              errors.email
                                ? errors.email.type === 'pattern'
                                  ? 'Email is not valid'
                                  : 'Email is Required'
                                : ''
                            }
                            {...field}
                          />
                        )}
                      />
                    </ListItem>
                    <ListItem>
                      <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        rules={{
                          validate: (value) =>
                            value === '' ||
                            value.length > 5 ||
                            'password length is more than 5',
                        }}
                        render={({ field }) => (
                          <TextField
                            variant="outlined"
                            id="password"
                            label="Password"
                            fullWidth
                            inputProps={{ type: 'password' }}
                            error={Boolean(errors.password)}
                            helperText={
                              errors.password
                                ? 'Password length is more than 5'
                                : ''
                            }
                            {...field}
                          />
                        )}
                      />
                    </ListItem>
                    <ListItem>
                      <Controller
                        name="confirmPassword"
                        control={control}
                        defaultValue=""
                        rules={{
                          validate: (value) =>
                            value === '' ||
                            value.length > 5 ||
                            'Confirm password length is more than 5',
                        }}
                        render={({ field }) => (
                          <TextField
                            variant="outlined"
                            id="confirmPassword"
                            label="Confirm Password"
                            fullWidth
                            inputProps={{ type: 'password' }}
                            error={Boolean(errors.confirmPassword)}
                            HelperText={
                              errors.confirmPassword
                                ? 'Confirm Password length is more than 5'
                                : ''
                            }
                            {...field}
                          />
                        )}
                      />
                    </ListItem>
                    <ListItem>
                      <Button
                        variant="contained"
                        fullWidth
                        color="primary"
                        type="submit"
                      >
                        Update
                      </Button>
                    </ListItem>
                  </List>
                </form>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(Profile), { ssr: true });
