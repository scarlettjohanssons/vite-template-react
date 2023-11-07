import { Meta } from '@storybook/react';
import { IconViewer } from '@core/IconViewer';

const meta: Meta = {
  title: 'Svg',
  component: IconViewer,
};

export default meta;

export const Icons = (args: any) => <IconViewer {...args} />;
