import * as path from 'path';
import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  "stories": ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-addon-mui-mode",
    "storybook-addon-perfect-design",
    "storybook-dark-mode",
    "storybook/addon-themes",
  ],
  core: {
    builder: '@storybook/builder-vite', // 👈 The builder enabled here.
  },
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: (config) => {
    return mergeConfig(config,{
      optimizeDeps: {
        include: ['storybook-dark-mode'],
      },
      resolve: {
        alias: [
          {
            find: "@mocks",
            replacement: path.resolve(__dirname, "../src/REST/mocks"),
          },
          {
            find: "@pages",
            replacement: path.resolve(__dirname, "../src/pages"),
          },
          {
            find: "@core",
            replacement: path.resolve(__dirname, "../src/core"),
          },
          {
            find: "@setup",
            replacement: path.resolve(__dirname, "../src/setup"),
          },
          {
            find: "@bus",
            replacement: path.resolve(__dirname, "../src/bus"),
          },
          {
            find: "@components",
            replacement: path.resolve(__dirname, "../src/components"),
          },
          {
            find: "@REST",
            replacement: path.resolve(__dirname, "../src/REST"),
          },
          {
            find: "@helpers",
            replacement: path.resolve(__dirname, "../src/helpers"),
          },
          {
            find: "@public",
            replacement: path.resolve(__dirname, "../public"),
          },
          {
            find: "@layouts",
            replacement: path.resolve(__dirname, "../src/layouts"),
          },
          {
            find: "@utils",
            replacement: path.resolve(__dirname, "../src/utils"),
          },
          {
            find: "@routes",
            replacement: path.resolve(__dirname, "../src/routes"),
          },
          {
            find: "@themes",
            replacement: path.resolve(__dirname, "../src/themes"),
          },
        ],
      },
    });
  },
  docs: {
    autodocs: 'tag',
  },
};

const { spawn } = require('child_process');
const json_server = spawn('yarn',
  ['json-server']);
json_server.stdout.on('data', (data: any) => {
  console.log(`json-server: ${data}`);
} ).on('error', (err: any) => {
  console.log(`error: ${err}`);
} ).on('close', (code: any) => {
  console.log(`child process exited with code ${code}`);
} );
export default config;
