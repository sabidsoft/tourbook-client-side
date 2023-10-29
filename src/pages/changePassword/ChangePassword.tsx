import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { inputStyle } from "../../assets/styles/inputStyle";
import FormInput from "../../components/forms/ui/formInput/FormInput";
import { InitialState } from "./types";
import FormErrorMessage from "../../components/forms/ui/formErrorMessage/FormErrorMessage";
import FormSubmitButton from "../../components/forms/ui/formSubmitButton/FormSubmitButton";
import { useChangePasswordMutation } from "../../redux/features/api/userApi/userApi";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/common/loader/Loader";
import validation from "./validation";

// initialState
const initialState: InitialState = {
    currentPassword: "",
    newPassword: ""
}

export default function ChangePassword() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialState);
    const [errorMessage, setErrorMessage] = useState("");
    const [changePassword, { isSuccess, error, isLoading }] = useChangePasswordMutation();

    const { currentPassword, newPassword } = formData;

    // handling input elements values
    const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        })
    }

    // handling form submit
    const onFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        setErrorMessage("");

        // get frontend form validation error message
        const frontendValidationErrorMessage = validation(currentPassword, newPassword);

        // set frontend form validation error message
        if (frontendValidationErrorMessage)
            return setErrorMessage(frontendValidationErrorMessage);

        // update password
        changePassword(formData);
    };


    useEffect(() => {
        if (isSuccess) {
            navigate("/account");
        }

        if (error) {
            if ("status" in error) {
                // get backend form validation error message
                const errMsgJSONString = 'error' in error ? error.error : JSON.stringify(error.data);
                const errMsgJSObj = JSON.parse(errMsgJSONString);

                // set backend form validation error message
                setErrorMessage(errMsgJSObj.message);
            }
        }
    }, [isSuccess, error, navigate]);

    if (isLoading)
        return <Loader />;

    return (
        <div className="mt-24 pb-8">
            <div className="w-[90%] sm:w-[570px] mx-auto py-5 px-6 shadow-md rounded-lg">
                <div className="flex flex-col justify-center items-center mb-8">
                    <h2 className="font-medium text-2xl text-[#6B6F70]">
                        Change Password
                    </h2>
                </div>
                <form onSubmit={onFormSubmit}>
                    <FormInput
                        type="password"
                        name="currentPassword"
                        placeholder="Current Password"
                        value={currentPassword}
                        className={inputStyle}
                        onChange={onInputChange}
                    />

                    <FormInput
                        type="password"
                        name="newPassword"
                        placeholder="New Password"
                        value={newPassword}
                        className={inputStyle}
                        onChange={onInputChange}
                    />

                    {errorMessage && <FormErrorMessage message={errorMessage} />}
                    <FormSubmitButton value="Submit" />
                </form>
            </div>
        </div>
    )
}