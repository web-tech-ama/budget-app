import React from 'react';
import {Operation} from "@/type/interface";
import {Field, Form, Formik} from "formik";
import Input from "@/components/ui/input/input";
import DatePicker from "../ui/input/datePicker";
import {FieldValues, SubmitHandler} from "react-hook-form";


interface FormOperation {
    handleSubmit :SubmitHandler<FieldValues>
}

const OperationForm: React.FC<FormOperation> = ({handleSubmit}) => {
    const initialValues: Operation = { operationDate:new Date, type: '',recurring : false };


    return (
        <>
            <Formik initialValues={initialValues} onSubmit={values => handleSubmit(values)}>
                {({ isSubmitting, errors, touched})=>(
                    <Form>
                        <div>
                            <Input label="Date de l'operation" labelId='operationDate' type="date" name="operationDate" id="operationDate"/>
                            <DatePicker
                                name="operationDate"
                            />
                        </div>
                        <div>
                            <Input label="Type d'operation" labelId='type' type="text" name="type" id="type"/>

                        </div>
                        <div>
                            <Input label="Operation recurent" labelId='type' type="checkbox" name="recurring" id="recurring"/>

                        </div>
                        <button type="submit" disabled={isSubmitting}>Creé</button>

                    </Form>
                )}

            </Formik>

        </>
    );
};

export default OperationForm;
