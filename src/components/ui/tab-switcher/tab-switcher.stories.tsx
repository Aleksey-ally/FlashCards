import { Meta, StoryObj } from '@storybook/react'

import { TabSwitcher, TabSwitcherContent } from './'

const meta = {
  title: 'Components/TabSwitcher',
  component: TabSwitcher,
  tags: ['autodocs'],
} satisfies Meta<typeof TabSwitcher>

export default meta

const templeTabs = [
  { title: 'Books', value: 'Books' },
  { title: 'Games', value: 'Games' },
  { title: 'Films', value: 'Films' },
  { title: 'Manga', value: 'Manga' },
  { title: 'Toys', value: 'Toys' },
]

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    return <TabSwitcher tabs={templeTabs}></TabSwitcher>
  },
}

export const WithContent: Story = {
  render: () => {
    return (
      <TabSwitcher tabs={templeTabs}>
        <TabSwitcherContent value={'Books'}>Books content</TabSwitcherContent>
        <TabSwitcherContent value={'Games'}>Games content</TabSwitcherContent>
        <TabSwitcherContent value={'Films'}>Films content</TabSwitcherContent>
        <TabSwitcherContent value={'Manga'}>Manga content</TabSwitcherContent>
        <TabSwitcherContent value={'Toys'}>Toys content</TabSwitcherContent>
      </TabSwitcher>
    )
  },
}

export const WithDefaultValue: Story = {
  render: () => {
    return (
      <TabSwitcher tabs={templeTabs} defaultValue={'Films'}>
        <TabSwitcherContent value={'Books'}>Books content</TabSwitcherContent>
        <TabSwitcherContent value={'Games'}>Games content</TabSwitcherContent>
        <TabSwitcherContent value={'Films'}>Films content</TabSwitcherContent>
        <TabSwitcherContent value={'Manga'}>Manga content</TabSwitcherContent>
        <TabSwitcherContent value={'Toys'}>Toys content</TabSwitcherContent>
      </TabSwitcher>
    )
  },
}

export const WithDisabledTabs: Story = {
  render: () => {
    return (
      <TabSwitcher
        tabs={[
          { title: 'Books', value: 'Books' },
          { title: 'Games', value: 'Games' },
          { title: 'Films', value: 'Films' },
          { title: 'Manga', value: 'Manga', disabled: true },
          { title: 'Toys', value: 'Toys', disabled: true },
        ]}
      >
        <TabSwitcherContent value={'Books'}>Books content</TabSwitcherContent>
        <TabSwitcherContent value={'Games'}>Games content</TabSwitcherContent>
        <TabSwitcherContent value={'Films'}>Films content</TabSwitcherContent>
        <TabSwitcherContent value={'Manga'}>Manga content</TabSwitcherContent>
        <TabSwitcherContent value={'Toys'}>Toys content</TabSwitcherContent>
      </TabSwitcher>
    )
  },
}
