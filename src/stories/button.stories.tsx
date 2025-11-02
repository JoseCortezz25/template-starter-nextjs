import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Button } from '../components/ui/button';
import { Pencil } from 'lucide-react';

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
    variant: 'primary',
    children: 'Primary Button'
  }
};

export const DefaultWithLeftIcon: Story = {
  args: {
    variant: 'primary',
    children: (
      <>
        <Pencil />
        Primary Button
      </>
    )
  }
};

export const DefaultWithRightIcon: Story = {
  args: {
    variant: 'primary',
    children: (
      <>
        Primary Button
        <Pencil />
      </>
    )
  }
};


export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button'
  }
};

export const SecondaryWithLeftIcon: Story = {
  args: {
    variant: 'secondary',
    children: (
      <>
        <Pencil />
        Secondary Button
      </>
    )
  }
};

export const SecondaryWithRightIcon: Story = {
  args: {
    variant: 'secondary',
    size: 'default',
    children: (
      <>
        Secondary Button
        <Pencil />
      </>
    )
  }
};