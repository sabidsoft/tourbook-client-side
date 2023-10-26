import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { inputStyle } from "../../assets/styles/inputStyle";
import FormInput from "../../components/forms/ui/formInput/FormInput";
import { InitialState } from "./types";
import FormErrorMessage from "../../components/forms/ui/formErrorMessage/FormErrorMessage";
import FormSubmitButton from "../../components/forms/ui/formSubmitButton/FormSubmitButton";
import { useChangePasswordMutation } from "../../redux/features/api/userApi/userApi";
import { useNavigate } from "react-router-dom";

// initialState
const initialState: InitialState = {
    currentPassword: "",
    newPassword: ""
};

export default function ChangePassword() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialState);
    const [errorMessage, setErrorMessage] = useState("");
    const [changePassword, { data, error }] = useChangePasswordMutation();

    // handling form submit
    const onFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        setErrorMessage("");

        changePassword(formData);
    };

    // handling input elements values
    const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    useEffect(() => {
        if (data) {
            navigate("/account");
        }

        if (error) {
            if ("status" in error) {
                const errMsgJSONString = 'error' in error ?
                    error.error : JSON.stringify(error.data);

                const errMsgJSObj = JSON.parse(errMsgJSONString);
                setErrorMessage(errMsgJSObj.message);
            }
        }
    }, [data, error, navigate])

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
                        value={formData.currentPassword}
                        className={inputStyle}
                        onChange={onInputChange}
                    />

                    <FormInput
                        type="password"
                        name="newPassword"
                        placeholder="New Password"
                        value={formData.newPassword}
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