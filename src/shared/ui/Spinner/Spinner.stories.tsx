import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LoadingSpinner } from './Spinner.ui';

const meta: Meta<typeof LoadingSpinner> = {
  title: 'UI/Spinner',
  component: LoadingSpinner,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof LoadingSpinner>;

export const Default: Story = {};
