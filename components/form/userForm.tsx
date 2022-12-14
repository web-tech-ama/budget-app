import React, { MouseEventHandler } from 'react';
import Input from "@/components/ui/input/input";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {useAuth} from "@/context/AuthUserContext";
import styles from "@/components/form/form.module.scss";
import Button from "@/components/ui/button/Button";
import {
    MaterialSymbolsEditSquareOutlineSharp,
    MaterialSymbolsLibraryAddCheckSharp,
    MdiDelete
} from "@/components/ui/icons/icons";
import {useStore} from "@/context/StroeContext";
interface FormUser {
    handleSubmitForm :SubmitHandler<FieldValues>,
    edit: boolean,
    updateValues?: Record<string, any>,
    handleDelete?: MouseEventHandler
}
const UserForm:React.FC<FormUser> = ({handleSubmitForm, edit, updateValues, handleDelete}) => {
    const { user } = useAuth()
    const {langJson}= useStore()

    const { register, handleSubmit,formState:{errors,isSubmitting}} = useForm({
        mode: "onChange",
        defaultValues: updateValues
    });


    return (
        <>
            <form className={edit ? styles.edit_form : styles.login_form}  onSubmit={handleSubmit(handleSubmitForm)}>
                <Input type='text' placeholder={langJson.form.placeholder?.firstName}  {...register('firstname')}
                       error={errors.firstname?.message}
                />
                <Input type='text' placeholder={langJson.form.placeholder?.lastName}  {...register('lastname')}
                       error={errors.lastname?.message}
                />
                <Input label={langJson.form.label?.dateOfBirthLabel}  id='age' type='date'  {...register('age')}
                       error={errors.age?.message}
                />
                <Input type='email'{...register('email') } readOnly value={user?.email}
                       error={errors.email?.message}
                />

                <div>
                    <Button disabled={isSubmitting}  text={edit ? langJson.form.label?.editLabel : langJson.form.label?.nextLabel}>
                        {edit?<MaterialSymbolsEditSquareOutlineSharp/>:<MaterialSymbolsLibraryAddCheckSharp/>}
                    </Button>
                </div>
            </form>
            {edit && <Button onClick={handleDelete} color="red" text={langJson.form.label?.deleteLabel }>
                <MdiDelete/>
            </Button>}

        </>
    );
};

export default UserForm;
