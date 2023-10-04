import type { Meta, Story } from '@storybook/react'

import { PersonalInformation } from './'
import { useState } from 'react'

const meta = {
  title: 'Profile/Personal information',
  component: PersonalInformation,
  tags: ['autodocs'],
} satisfies Meta<typeof PersonalInformation>

export default meta
export const Default: Story = () => {
  const [name, setName] = useState('New Name')

  const handleNameChange = (newName: string) => {
    console.info('name changed to:', newName)
    setName(newName)
  }

  return (
    <PersonalInformation
      email="example@doemail.com"
      avatar="https://fastly.picsum.photos/id/819/200/200.jpg?hmac=nCwO4yKGbs8354aS0yf974UlPFBF_gwUSNazar7yBhk"
      name={name}
      onAvatarChange={() => {
        console.info('avatar changed')
      }}
      onNameChange={handleNameChange}
      onLogout={() => {
        console.info('logout')
      }}
    />
  )
}
