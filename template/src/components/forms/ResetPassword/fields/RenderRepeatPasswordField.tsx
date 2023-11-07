import React, { useState } from 'react';
import { FieldRenderProps } from 'react-final-form';

import { Box } from '@mui/material';

import { PasswordInput } from '@components/common/inputs/PasswordInput';
import { getFieldError } from '@packages/evne-form';

export const RenderRepeatPasswordField: React.FC<FieldRenderProps<string>> = ({
  input,
  meta,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box my={1}>
      <PasswordInput
        fullWidth
        required
        inputProps={{
          autoComplete: 'new-password',
          'data-testid': 'reset-password-repeat-password',
        }}
        setShowPassword={setShowPassword}
        showPassword={showPassword}
        label={'Repeat Password'}
        error={!!getFieldError(meta)}
        helperText={getFieldError(meta)}
        {...input}
      />
    </Box>
  );
};
