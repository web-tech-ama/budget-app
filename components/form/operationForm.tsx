import React, {useState} from 'react';
import {Category} from "@/type/interface";
import { useForm} from "react-hook-form";
import Input from "@/components/ui/input/input";
import Select from "@/components/ui/select/select";
import Options from "@/components/ui/select/Options";
import Button from "@/components/ui/button/Button";
import Modal from "@/components/ui/modal/modal";
import CategoryForm from "@/components/form/categoryForm";
import {insert} from "@/utils/supabaseClient";
import {useStore} from "@/context/StroeContext";
import styles from "@/components/form/form.module.scss";
import {MaterialSymbolsLibraryAddCheckSharp} from "@/components/ui/icons/icons";
import {useAuth} from "@/context/AuthUserContext";



interface OperationProps{
    handleSubmitForm :  any
    setId : React.Dispatch<React.SetStateAction<number | undefined>>

}


const OperationForm = ({handleSubmitForm,setId}:OperationProps) => {
    const {user} = useAuth();
    const {category, langJson}:{category:Category[], langJson:any}=useStore()
    const [getId ,setGetId]=useState<number|undefined>(0)

    const [isSelect, setIsSelect]= useState<boolean>(false)
    const [operationIsSelect, setOperationIsSelect]= useState<boolean>(false)
    const [categoryIsSelect, setCategoryIsSelect]= useState<boolean>(false)
    const [openModal, setOpenModal]= useState<boolean>(false)
    const handleCloseModal:any =() => {
        setOpenModal(!openModal)
    }

    const [inputValue , setInputValue]=useState<string>('')
    const [operationInputValue , setOperationInputValue]=useState<string>('')
    const [categoryInputValue , setCategoryInputValue]=useState<string>('')
    const handleSubmitCat = async (value:any)=>{
       const category={
            ...value,
           user_id:user.id
        }
       await insert('category',category)
        handleCloseModal()
    }
    const handelSelect =()=>{
        setIsSelect((prevState)=>!prevState)
    }
    const handelOperationSelect =()=>{
        setOperationIsSelect((prevState)=>!prevState)
    }

    const handelCategorySelect =()=>{
        setCategoryIsSelect((prevState)=>!prevState)
    }
    const {register,handleSubmit,control, setValue,formState:{errors,isSubmitting}}=useForm(
        {
            mode:"onChange",

        }
    )

    return (
        <>
            <form className={styles.login_form} onSubmit={handleSubmit(handleSubmitForm)} >
                <Input type='text' placeholder={langJson.dashboardLabel.operation.amount} {...register('amount')}
                       error={errors.amount?.message}
                />
                <Input type='checkbox' label={langJson.dashboardLabel.operation.recurring} {...register('recurring')}
                       error={errors.recurring?.message}
                />
                <Select label={langJson.dashboardLabel.operation.paymentMethod} handelSelect={handelSelect} inputValue={inputValue} isSelect={isSelect}>
                    {[{mode:langJson.dashboardLabel.operation.card},{mode: langJson.dashboardLabel.operation.sampling}].map((value,index)=>(
                        <Options setFormValue={setValue} outputControl={control} name='payment_mode' key={index} value={value.mode} inputValue={setInputValue} selectValue={inputValue} clos={handelSelect} id={index} getId={setGetId}/>
                    ))}

                </Select>
                <Select label={langJson.dashboardLabel.operation.type} handelSelect={handelOperationSelect} inputValue={operationInputValue} isSelect={operationIsSelect}>
                    {[{mode:langJson.dashboardLabel.operation.revenue},{mode: langJson.dashboardLabel.operation.expense}].map((value,index)=>(
                        <Options setFormValue={setValue} outputControl={control} name='operation_type' key={index} value={value.mode} inputValue={setOperationInputValue} selectValue={operationInputValue} clos={handelOperationSelect} id={index} getId={setGetId}/>
                    ))}

                </Select>
                <Select label={langJson.dashboardLabel.operation.category} handelSelect={handelCategorySelect} inputValue={categoryInputValue} isSelect={categoryIsSelect}>
                    <>
                        {category.map((value)=>(
                            <Options  setFormValue={setValue} outputControl={control} name='category_id' key={value.id} value={value.name} inputValue={setCategoryInputValue} selectValue={categoryInputValue} clos={handelCategorySelect} id={value.id} getId={setId}/>
                        ))}
                        <Button onClick={(e)=>handleCloseModal(e.preventDefault())} padding='0.3em' text={langJson.form.label.addCategory}></Button>
                    </>


                </Select>
                <Button disabled={isSubmitting} text={langJson.form.label.saveLabel}>
                    <MaterialSymbolsLibraryAddCheckSharp/>
                </Button>

            </form>
            <Modal title={langJson.form.label.addCategory} close={true} handelClose={handleCloseModal} openModal={openModal}>
                <CategoryForm handleSubmitForm={handleSubmitCat}/>

            </Modal>

        </>
    );
};

export default OperationForm;
