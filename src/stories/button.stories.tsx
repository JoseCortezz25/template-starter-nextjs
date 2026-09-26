import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { Pencil } from 'lucide-react';

import { Button } from '../components/ui/button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  args: { onClick: fn() }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    children: 'Button'
  }
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Button'
  }
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Button'
  }
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Button'
  }
};

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Button'
  }
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Button'
  }
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Button'
  }
};

export const Icon: Story = {
  args: {
    size: 'icon',
    'aria-label': 'Button',
    children: <Pencil />
  }
};
