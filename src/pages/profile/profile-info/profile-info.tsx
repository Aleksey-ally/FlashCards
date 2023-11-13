import { ChangeEvent, FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import s from './profile-info.module.scss'

import { Edit, Logout } from '@/assets'
import { Avatar } from '@/components/avatar'
import { profileSchema, ProfileSchemaType } from '@/components/schemes/use-profile-scheme.ts'
import Button from '@/components/ui/button/button.tsx'
import { Card } from '@/components/ui/card'
import { ControlledTextField } from '@/components/ui/controlled'
import { Typography } from '@/components/ui/typography'

type UserData = { avatar: string | null; email: string; name: string }
type ProfileInfoProps = {
  name: string | undefined
  email: string | undefined
  src: string | null
  handleChangeAvatar: (event: ChangeEvent<HTMLInputElement>) => void
  handleLogout: () => void
  onSubmit: (data: ProfileSchemaType) => void
  showText: boolean
  setShowText: (showTextField: boolean) => void
  user?: UserData
  newAvatar: File | null
}

export const ProfileInfo: FC<ProfileInfoProps> = ({
  name,
  email,
  src,
  handleChangeAvatar,
  handleLogout,
  onSubmit,
  showText,
  setShowText,
  newAvatar,
}) => {
  const handleChangeName = () => {
    setShowText(true)
  }

  const { handleSubmit, control } = useForm<ProfileSchemaType>({
    mode: 'onSubmit',
    resolver: zodResolver(profileSchema),
    defaultValues: {
      email: email,
      name: '',
    },
  })

  return (
    <Card className={s.card}>
      <Typography variant="large" className={s.title}>
        Personal Information
      </Typography>
      <div className={s.imgBlock}>
        {newAvatar ? (
          <Avatar src={URL.createObjectURL(newAvatar)} size={96} />
        ) : (
          <Avatar src={src} name="user" size={96} />
        )}
        <label>
          <input
            className={s.fileUploader}
            type="file"
            accept="image/*"
            onChange={handleChangeAvatar}
          />
          <Button variant="secondary" as={'span'} className={s.img}>
            <Edit className={s.editIcon} />
          </Button>
        </label>
      </div>
      {!showText ? (
        <>
          <Typography variant="h2" className={s.name}>
            {name} <Edit className={s.editIcon} onClick={handleChangeName} />
          </Typography>
          <Typography variant="body2" className={s.email}>
            {email}
          </Typography>
          <Button variant="secondary" onClick={handleLogout} className={s.logoutBtn}>
            <Logout /> <Typography>Logout</Typography>
          </Button>
        </>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
          <ControlledTextField label="Nickname" name="name" control={control} defaultValue={''} />
          <Button className={s.submitBtn}>Save Changes</Button>
        </form>
      )}
    </Card>
  )
}
