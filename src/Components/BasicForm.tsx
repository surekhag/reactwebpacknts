import React, { useState } from 'react';
import { Form, Field, FormElement, FieldRenderProps, FormRenderProps } from '@progress/kendo-react-form';
import { Error } from '@progress/kendo-react-labels';
import { Input } from '@progress/kendo-react-inputs';
import { Button } from "@progress/kendo-react-buttons";

import SharedButtons from "../SharedComps/SharedButtons"
import { Fade } from "@progress/kendo-react-animation";
import { FormInput } from '../SharedComps/FormComponents';
import { emailValidator,userNameValidator } from '../SharedComps/SharedValidators';

const Styles = require("../Styles/BasicForm.css");
const emailRegex: RegExp = new RegExp(/\S+@\S+\.\S+/);
import {
    Notification,
    NotificationGroup,
} from "@progress/kendo-react-notification";

interface State {
    success: boolean;
}

//const emailValidator = (value: string) => (emailRegex.test(value) ? "" : "Please enter a valid email.");
const EmailInput = (fieldRenderProps: FieldRenderProps) => {
    const { validationMessage, visited, ...others } = fieldRenderProps;
    return (
        <div>
            <Input {...others} />
            {
                visited && validationMessage &&
                (<Error>{validationMessage}</Error>)
            }
        </div>
    );
};

const NameRegex: RegExp = new RegExp(/^[A-Za-z]+$/);
const nameValidator = (value: string) => (NameRegex.test(value) ? "" : "Please enter a valid name.");

const FirstNameInput = (fieldRenderProps: FieldRenderProps) => {
    const { validationMessage, visited, ...others } = fieldRenderProps;
    return (
        <div>
            <Input {...others} />
            {
                visited && validationMessage &&
                (<Error>{validationMessage}</Error>)
            }
        </div>
    );
};

const BasicForm = () => {
    const [state, setState] = useState<State>({
        success: false
    });

    const [isDisplayed, setIsDisplayed] = useState(false);
    const { success } = state;
    const handleSubmit = (dataItem: { [name: string]: any }) => {
        const node = document.getElementById("clear")
        node.click();
        setState({ ...state, success: true })
    }

    const HandleShowClick = () => {
        setIsDisplayed(true);
    }
    const HandleHideClick = () => {
        setIsDisplayed(false);
    }

    return (<>
        <h3>Form Implementation</h3>
        <SharedButtons
            isDisplayed={isDisplayed}
            HandleShowClick={HandleShowClick}
            HandleHideClick={HandleHideClick}
            title1={"Show Form"}
            title2={"Hide Form"} />

        {isDisplayed && <>

            <Form
                onSubmit={handleSubmit}
                render={(formRenderProps: FormRenderProps) => (
                    <FormElement style={{ maxWidth: 650 }}>
                        <fieldset className={'k-form-fieldset'}>
                            <legend className={'k-form-legend sub-text'}>Please fill in the details:</legend>
                            <div className="mb-3">
                                <Field name={'firstName'} label={'First name'}
                                    component={FormInput}
                                    validator={userNameValidator}/>
                            </div>

                            <div className="mb-3">
                                <Field name={'lastName'} component={Input} label={'Last name'} />
                            </div>
                            <div className="mb-3">
                                <Field name={'desn'} component={Input} label={'Designation'} />
                            </div>
                            <div className="mb-3">
                                <Field name={'empId'} component={Input} label={'Employee Id'} />
                            </div>

                            <div className="mb-3">
                                <Field name={"email"} type={"email"} label={"Email"}
                                     component={FormInput}
                                     validator={emailValidator}/>
                            </div>
                        </fieldset>
                        <div className="k-form-buttons">
                            <Button
                                type={'submit'}
                                className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                                disabled={!formRenderProps.allowSubmit}
                            >
                                Submit
                            </Button>

                            <Button id="clear" onClick={formRenderProps.onFormReset}>Clear</Button>

                        </div>
                    </FormElement>
                )}
            />
            <NotificationGroup
                style={{
                    right: 0,
                    top: 0,
                    alignItems: "flex-start",
                    flexWrap: "wrap-reverse",
                }}
            >
                <Fade>
                    {success && (
                        <Notification
                            type={{ style: "success", icon: true }}
                            closable={true}
                            onClose={() => setState({ ...state, success: false })}
                        >
                            <span>Form detail has been saved!</span>
                        </Notification>
                    )}
                </Fade>
            </NotificationGroup>
        </> }</>
    );
};
export default BasicForm;