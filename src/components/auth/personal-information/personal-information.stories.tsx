import type { Meta, StoryObj } from '@storybook/react'

import { PersonalInformation } from './'

const meta = {
  title: 'Profile/Personal information',
  component: PersonalInformation,
  tags: ['autodocs'],
} satisfies Meta<typeof PersonalInformation>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    email: 'example@doemail.com',
    avatar:
        'https://fastly.picsum.photos/id/819/200/200.jpg?hmac=nCwO4yKGbs8354aS0yf974UlPFBF_gwUSNazar7yBhk',
    name: 'New Name',
    onAvatarChange: () => {
      console.info('avatar changed')
    },
    onNameChange: () => {
      console.info('name changed')
    },
    onLogout: () => {
      console.info('logout')
    },
  },
}

