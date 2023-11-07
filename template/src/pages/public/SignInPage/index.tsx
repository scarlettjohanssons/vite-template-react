import { useSnackbar } from 'notistack';

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Box, Typography, useTheme } from '@mui/material';

import { authActions } from '@bus/auth/actions';
import SignIn from '@components/forms/SignIn';
import { schema } from '@components/forms/SignIn/schema';
import { EvneFinalForm } from '@packages/evne-form';
import { book } from '@routes/book';

const SignInPage = () => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const snackbarMessage = localStorage.getItem('snackbar_message');
    if (snackbarMessage) {
      enqueueSnackbar(snackbarMessage, {
        variant: 'success',
      });
      localStorage.removeItem('snackbar_message');
    }
  }, []);

  const onSubmitSuccess = () => {};

  return (
    <>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <Typography variant={'title'}>Welcome to the Future!</Typography>
        <Typography variant={'h5'} color={theme.palette.grey['50']}>
          Everything will start after you Sign In
        </Typography>
        <Box mt={5}>
          <EvneFinalForm
            component={SignIn}
            sagaAction={authActions.signIn}
            onSubmitSuccess={onSubmitSuccess}
            schema={schema}
          />
        </Box>
      </Box>
      <Box
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        mt={4}
        mb={10}>
        <Typography mb={1} variant={'h5'} color={theme.palette.grey['50']}>
          Don`t have an account?
        </Typography>
        <Link to={book.signUp}>Sign Up</Link>
      </Box>
    </>
  );
};

export default SignInPage;
