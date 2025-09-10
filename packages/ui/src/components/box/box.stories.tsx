import type { Meta, StoryObj } from '@storybook/react';
import { Box } from './box';

const meta: Meta<typeof Box> = {
  title: 'UI/Box',
  component: Box,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['default', 'outline'],
    },
    padding: {
      control: { type: 'radio' },
      options: ['default', 'sm', 'lg', 'none'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Box>;

export const Default: Story = {
  args: {
    children: 'This is a default box.',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'This is an outline box.',
  },
};

export const SmallPadding: Story = {
  args: {
    padding: 'sm',
    children: 'This box has small padding.',
  },
};

export const NoPadding: Story = {
  args: {
    padding: 'none',
    children: 'This box has no padding.',
  },
};
