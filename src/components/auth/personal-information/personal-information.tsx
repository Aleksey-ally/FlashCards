import s from './personal-information.module.scss'
import {Card} from '@/components/ui/card'
import {Typography} from '@/components/ui/typography'
import {Button} from '@/components/ui/button'
import Edit from '@/assets/icons/edit.tsx'
import Logout from '@/assets/icons/logout.tsx'
import {useState} from "react";
import {ControlledTextField} from "@/components/ui/controlled";
import {SubmitHandler, useForm} from "react-hook-form";

type FormData = {
    newName: string;
};

type Props = {
    email: string
    avatar: string
    name: string
    onLogout: () => void
    onAvatarChange: (newAvatar: string) => void
    onNameChange: (newName: string) => void
}

export const PersonalInformation = ({
                                        avatar,
                                        email,
                                        name,
                                        onAvatarChange,
                                        onNameChange,
                                        onLogout,
                                    }: Props) => {
    const {handleSubmit, control, reset} = useForm<FormData>();
    const [isEditingName, setIsEditingName] = useState(false);

    const onSubmit: SubmitHandler<FormData> = ({newName}) => {
        onNameChange(newName);
        setIsEditingName(false);
    };

    const handleAvatarChange = () => {
        onAvatarChange('new avatar');
    };

    const handleStartEditingName = () => {
        setIsEditingName(true);
        reset({newName: name});
    };

    const handleCancelEditingName = () => {
        setIsEditingName(false);
    };

    return (
        <Card className={s.personalInformation}>
            <Typography variant="large" className={s.title}>
                Personal Information
            </Typography>
            <div className={s.photoContainer}>
                <div className={s.photoBox}>
                    <img src={avatar} alt={'avatar'}/>
                    <button
                        className={s.photoEditButton}
                        onClick={handleAvatarChange}
                        aria-label="Edit Avatar"
                    >
                        <Edit/>
                    </button>
                </div>
            </div>
            <div className={s.nameContainer}>
                {isEditingName ? (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ControlledTextField
                            name="newName"
                            control={control}
                            className={s.editableNameInput}
                        />
                        <button
                            type="button"
                            className={s.editNameButton}
                            onClick={handleCancelEditingName}
                            aria-label="Cancel Edit Name"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={s.editNameButton}
                            aria-label="Save Name"
                        >
                            Save
                        </button>
                    </form>
                ) : (
                    <>
                        <Typography variant="h1" className={s.name}>
                            {name}
                        </Typography>
                        <button
                            className={s.editNameButton}
                            onClick={handleStartEditingName}
                            aria-label="Edit Name"
                        >
                            <Edit/>
                        </button>
                    </>
                )}
            </div>
            <Typography variant="body2" className={s.email}>
                {email}
            </Typography>
            <div className={s.buttonContainer}>
                <Button variant={'secondary'} onClick={onLogout}>
                    <Logout/>
                    Log Out
                </Button>
            </div>
        </Card>
    )
}
