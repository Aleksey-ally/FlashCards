import { action } from '@storybook/addon-actions'
import { Meta, StoryObj } from '@storybook/react'

import { RecoveryPassword } from '@/components/auth'

const meta = {
  title: 'Forms/RecoveryPassword',
  component: RecoveryPassword,
  tags: ['autodocs'],
  argTypes: { onSubmit: { action: 'clicked' } },
  parameters: {
    controls: { expanded: true },
  },
} satisfies Meta<typeof RecoveryPassword>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onSubmit: action('onSubmit'),
  },
}
