import { EvneFinalForm } from '@packages/evne-form';
import MockProvider from '@core/providers/MockProvider';
import interactions from '@helpers/interactions';
import { action } from '@storybook/addon-actions';
import { expect } from '@storybook/jest';
import { waitFor, within } from '@storybook/testing-library';
import { StoryAnnotations } from '@storybook/types';

import SignUp from './index';
import { schema } from './schema';

export default {
  title: 'forms/SignUp',
  component: EvneFinalForm,
  decorators: [(story: () => any) => <MockProvider>{story()}</MockProvider>],
};

export const SignUpSuccess: StoryAnnotations = {
  args: {
    onSubmit: action('handleSubmit'),
    component: SignUp,
    schema,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement as HTMLElement);
    await interactions.sleep(1000);
    await interactions.typeToInput(canvas, 'sign-up-first-name', 'occaecat');
    await interactions.typeToInput(canvas, 'sign-up-last-name', 'deserunt');
    await interactions.typeToInput(canvas, 'sign-up-email', 'dolor@mail.test');
    await interactions.typeToInput(
      canvas,
      'sign-up-password',
      '_km5gRo&)260XQX',
    );
    await interactions.typeToInput(
      canvas,
      'sign-up-repeat-password',
      '_km5gRo&)260XQX',
    );
    // SUCCESS PLAY
    await interactions.sleep(1000);
    await interactions.clickSubmit(canvas);
    await waitFor(() => expect(args.onSubmit).toHaveBeenCalled());
  },
};

export const SignUpError: StoryAnnotations = {
  args: {
    onSubmit: action('handleSubmit'),
    component: SignUp,
    schema,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement as HTMLElement);
    await interactions.clickSubmit(canvas);
    await waitFor(() => expect(args.onSubmit).not.toHaveBeenCalled());
  },
};
