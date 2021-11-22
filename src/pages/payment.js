import {
  Button,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
  
  Typography,
} from '@material-ui/core';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

// import { useSnackbar } from 'notistack';


import React, { useContext, useEffect, useState } from 'react';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { Store, actionTypes } from '../utils/Store';
import useStyles from '../utils/styles';

export default function Payment() {
  const styles = useStyles();
  // const { closeSnackbar, enqueueSnackbar } = useSnackbar();
  
  
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { shippingAddress },
  } = state;
  const [paymentMethod, setPaymentMethod] = useState('');
  useEffect(() => {
    if (!shippingAddress.address) {
      router.push('/shipping');
    } else {
      setPaymentMethod(Cookies.get('paymentMethod' || ''));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitHandler = (ev) => {
    // closeSnackbar();
    ev.preventDefault();
    if(!paymentMethod) {
      alert('Payment Method is required')
    } else {
      dispatch({type: actionTypes.SAVE_PAYMENT_METHOD, payload: paymentMethod})
      
    }
    Cookies.set('paymentMethod', paymentMethod);
    router.push('/placeorder')
  };
  return (
    <Layout title="Payment Method">
      <CheckoutWizard activeStep={2} />
      <form className={styles.form} onSubmit={submitHandler}>
        <Typography component="h1" variant="h1">
          Payment Method
        </Typography>
        <List>
          <ListItem>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="Payment Method"
                name="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  label="Paypal"
                  value="Paypal"
                  control={<Radio />}
                />
                <FormControlLabel
                  label="Stripe"
                  value="Stripe"
                  control={<Radio />}
                />

                <FormControlLabel
                  label="Cash"
                  value="Cash"
                  control={<Radio />}
                />
              </RadioGroup>
            </FormControl>
          </ListItem>
          <ListItem>
            <Button fullWidth type="submit" variant="contained" color="primary">
              Continue
            </Button>
          </ListItem>
          <ListItem>
            <Button
              fullWidth
              type="button"
              variant="contained"
              color="secondary"
              onClick={() => router.push('/shipping')}
            >
              Back
            </Button>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}
