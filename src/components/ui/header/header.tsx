import { ComponentPropsWithoutRef } from 'react'

import { Link } from 'react-router-dom'

import { Button } from '../button'
import { DropdownItem } from '../dropdown/dropdownItem'
import { DropdownItemWithIcon } from '../dropdown/dropdownItem/dropdownItemWithIcon.tsx'
import { Typography } from '../typography'

import s from './header.module.scss'

import { HeaderLogo, Logout, PersonOutline } from '@/assets'
import { Avatar } from '@/components/avatar'
import { Dropdown } from '@/components/ui/dropdown'

type UserData = { avatar: string | null; email: string; name: string }
type Props = {
  variant?: 'with button' | 'with avatar'
  user?: UserData
} & ComponentPropsWithoutRef<'header'>

export const Header = ({ variant = 'with button', user, ...rest }: Props) => {
  return (
    <header {...rest} className={s.header}>
      <Link to={'/'}>
        <HeaderLogo />
      </Link>
      {variant === 'with avatar' ? (
        <div className={s.userBlock}>
          <Typography variant="subtitle1" as="span" className={s.userName}>
            {user?.name ? user.name : 'User Name'}
          </Typography>
          <Dropdown
            trigger={
              <div className={s.wrapperAvatar}>
                <Avatar
                  src={
                    user?.avatar ||
                    'https://fikiwiki.com/uploads/posts/2022-02/1644918620_17-fikiwiki-com-p-krasivie-kartinki-visokogo-razresheniya-19.jpg'
                  }
                  size={36}
                  name={user?.name || 'User'}
                />
              </div>
            }
          >
            <DropdownItem>
              <Avatar
                src={
                  user?.avatar ||
                  'https://fikiwiki.com/uploads/posts/2022-02/1644918620_17-fikiwiki-com-p-krasivie-kartinki-visokogo-razresheniya-19.jpg'
                }
                size={36}
                name={user?.name || 'User'}
              />

              <div>
                <Typography variant="subtitle2"> {user?.name ? user.name : 'User Name'}</Typography>
                <Typography variant="caption" style={{ color: 'var(--color-dark-100)' }}>
                  {user?.email ? user.email : 'User Name'}
                </Typography>
              </div>
            </DropdownItem>
            <DropdownItemWithIcon icon={<PersonOutline />} text="My Profile" onSelect={() => {}} />
            <DropdownItemWithIcon icon={<Logout />} text="Sign Out" onSelect={() => {}} />
          </Dropdown>
        </div>
      ) : (
        <Button>
          <Typography variant="subtitle2" as="span">
            Sign In
          </Typography>
        </Button>
      )}
    </header>
  )
}
