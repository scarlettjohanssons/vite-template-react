import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Field, FormRenderProps } from 'react-final-form';

import { Box, Button } from '@mui/material';

import { RenderEmailField } from '@components/forms/ForgotPassword/fields/RenderEmailField';

// RENDER_FIELDS

export const ForgotPassword = (props: FormRenderProps) => {
  return (
    <Box width={500} display={'flex'} flexDirection={'column'}>
      <Field name={'email'} component={RenderEmailField} />
      {/*FIELDS*/}
      <Box my={1}>
        <Button type={'submit'} role={'submit'}>
          Sign In
        </Button>
      </Box>
    </Box>
  );
};
export default ForgotPassword;
