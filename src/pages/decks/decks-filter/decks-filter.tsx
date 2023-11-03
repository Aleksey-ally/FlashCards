import s from './decks-filter.module.scss'

import { Trash } from '@/assets'
import Button from '@/components/ui/button/button.tsx'
import { Slider } from '@/components/ui/slider'
import { TabSwitcher } from '@/components/ui/tab-switcher'
import { TextField } from '@/components/ui/text-field'

export type DecksFilterProps = {
  inputValue: string
  onChangeInputValue: (value: string) => void
  tabValue: string
  tabLabel: string
  onChangeTabValue: (value: string) => void
  sliderValue: number[]
  minSliderValue?: number
  maxSliderValue?: number
  sliderLabel: string
  onChangeSliderValue: (value: number[]) => void
  onClearFilter: () => void
  className?: string
}

export const DecksFilter = ({
  inputValue,
  tabValue,
  sliderValue,
  sliderLabel,
  minSliderValue,
  maxSliderValue,
  onChangeInputValue,
  onChangeTabValue,
  onChangeSliderValue,
  onClearFilter,
}: DecksFilterProps): JSX.Element => {
  return (
    <div className={s.container}>
      <TextField
        placeholder={'Input deck name'}
        isSearch
        value={inputValue}
        onValueChange={onChangeInputValue}
      />

      <TabSwitcher
        value={tabValue}
        onValueChange={onChangeTabValue}
        tabs={[
          { title: 'All Cards', value: 'all' },
          { title: ' My Cards ', value: 'my cards' },
        ]}
      ></TabSwitcher>
      <Slider
        value={sliderValue}
        onValueChange={onChangeSliderValue}
        min={minSliderValue}
        max={maxSliderValue}
        title={sliderLabel}
      />
      <Button className={s.button} variant={'secondary'} onClick={onClearFilter}>
        <>
          <Trash />
          Clear Filter
        </>
      </Button>
    </div>
  )
}
