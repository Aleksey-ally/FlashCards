import { ChangeEvent, useState } from 'react'

import { toast } from 'react-toastify'

import { Loader } from '@/components/ui/loader'
import { ProfileInfo } from '@/pages/profile/profile-info'
import { infoOptions } from '@/pages/utils/toastify-options/toastify-options.ts'
import {
  useLogoutMutation,
  useMeQuery,
  useUpdateProfileMutation,
} from '@/services/auth/auth.service.ts'

export const Profile = () => {
  const [showText, setShowText] = useState(false)
  const [avatar, setAvatar] = useState<File | null>(null)
  const [newAvatar, setNewAvatar] = useState<File | null>(null)

  const { currentData: data } = useMeQuery()
  const [logout] = useLogoutMutation()
  const [updateProfile, { isLoading }] = useUpdateProfileMutation()
  const parting = `Goodbye, ${data?.name || data?.email}`

  const handleFormSubmit = (data: { email: string; name: string }) => {
    setShowText(false)

    const form = new FormData()

    form.append('email', data.email)
    form.append('name', data.name)
    if (avatar) {
      form.append('avatar', avatar || '')
    }
    updateProfile(form)
  }

  const handleChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    setShowText(true)
    const file = e.target.files![0]

    setNewAvatar(file)
    setAvatar(file)
  }

  const logoutHandler = () => {
    logout()
      .unwrap()
      .then(() => {
        toast.info(parting, infoOptions)
      })
  }

  if (isLoading) return <Loader />

  return (
    <ProfileInfo
      name={data?.name}
      email={data?.email}
      src={
        data && data.avatar
          ? data.avatar
          : 'https://fikiwiki.com/uploads/posts/2022-02/1644918620_17-fikiwiki-com-p-krasivie-kartinki-visokogo-razresheniya-19.jpg'
      }
      newAvatar={newAvatar}
      handleChangeAvatar={handleChangeAvatar}
      onSubmit={handleFormSubmit}
      handleLogout={logoutHandler}
      showText={showText}
      setShowText={setShowText}
    />
  )
}
