import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Input } from '../components/molecules/input';

const meta = {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  args: { onClick: fn() }
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InputText: Story = {
  args: {
    label: 'This is a label',
    placeholder: 'This is a placeholder',
    value: 'This is a value',
    onChange: fn(),
    disabled: false,
    type: 'text',
    name: 'input',
    id: 'input'
  }
};

export const InputPassword: Story = {
  args: {
    label: 'This is a label',
    placeholder: 'This is a placeholder',
    value: 'This is a value',
    disabled: false,
    type: 'password',
    name: 'input',
    id: 'input'
  }
};
