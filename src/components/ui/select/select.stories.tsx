import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { Select } from './select'

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

const items = [
  { value: 'France', label: 'France' },
  { value: 'United-Kingdom', label: 'United-Kingdom' },
  { value: 'Spain', label: 'Spain' },
]

const numbers = [
  { value: 1, label: 1 },
  { value: 5, label: 5 },
  { value: 10, label: 10 },
]

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('')

    return (
      <Select value={value} items={items} onValueChange={setValue} placeholder={'Pick an option'} />
    )
  },
}

export const Disabled: Story = {
  render: () => {
    const [value, setValue] = useState<number | string>('')

    return (
      <Select
        value={value}
        items={items}
        onValueChange={setValue}
        placeholder={'Pick an option'}
        disabled={true}
      />
    )
  },
}

export const WithLabel: Story = {
  render: () => {
    const [value, setValue] = useState<number | string>('')

    return (
      <Select
        value={value}
        items={items}
        onValueChange={setValue}
        label={'Pick your country'}
        placeholder={'Pick an option'}
      />
    )
  },
}

export const DisabledWithLabel: Story = {
  render: () => {
    const [value, setValue] = useState<number | string>('')

    return (
      <Select
        value={value}
        items={items}
        onValueChange={setValue}
        label={'Pick your country'}
        placeholder={'Pick an option'}
        disabled={true}
      />
    )
  },
}

export const ForPaginationDefault: Story = {
  render: () => {
    const [value, setValue] = useState<number | string>(5)

    return <Select variant={'pagination'} value={value} items={numbers} onValueChange={setValue} />
  },
}

export const ForPaginationDisabled: Story = {
  render: () => {
    const [value, setValue] = useState<number | string>(5)

    return (
      <Select
        variant={'pagination'}
        value={value}
        items={numbers}
        onValueChange={setValue}
        disabled={true}
      />
    )
  },
}

export const ForPaginationWithLabel: Story = {
  render: () => {
    const [value, setValue] = useState<number | string>(5)

    return (
      <Select
        variant={'pagination'}
        value={value}
        items={numbers}
        onValueChange={setValue}
        label={'Pick number'}
      />
    )
  },
}

export const ForPaginationWithLabelDisabled: Story = {
  render: () => {
    const [value, setValue] = useState<number | string>(5)

    return (
      <Select
        variant={'pagination'}
        value={value}
        items={numbers}
        onValueChange={setValue}
        label={'Pick number'}
        disabled={true}
      />
    )
  },
}
