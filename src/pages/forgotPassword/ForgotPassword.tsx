import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import FormInput from "../../components/forms/ui/formInput/FormInput";
import FormErrorMessage from "../../components/forms/ui/formErrorMessage/FormErrorMessage";
import FormSubmitButton from "../../components/forms/ui/formSubmitButton/FormSubmitButton";
import { inputStyle } from "../../assets/styles/inputStyle";
import { useForgotPasswordMutation } from "../../redux/features/api/userApi/userApi";
import Loader from "../../components/common/loader/Loader";
import validation from "./validation";
import useTitle from "../../hooks/useTitle";

export default function ForgotPassword() {
    useTitle("Forgot Password");
    const [email, setEmail] = useState("");
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [forgotPassword, { isSuccess, error, isLoading }] = useForgotPasswordMutation();

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value);
    };

    // handling form submit
    const onFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        setErrorMessage("");

        // get frontend form validation error message
        const frontendValidationErrorMessage = validation(email);

        // set frontend form validation error message
        if (frontendValidationErrorMessage)
            return setErrorMessage(frontendValidationErrorMessage);

        forgotPassword({ email });
    };

    useEffect(() => {
        if (isSuccess) {
            setIsEmailSent(true);
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
    }, [isSuccess, error]);

    if (isLoading)
        return <Loader />;

    return (
        <div className="mt-24 pb-8">
            <div className="w-[90%] sm:w-[570px] mx-auto py-5 px-6 shadow-md rounded-lg">
                <div className="flex flex-col justify-center items-center mb-8">
                    <h2 className="font-medium text-2xl text-[#6B6F70]">
                        {isEmailSent ? "Email Sent Successful" : "Forgot Password"}
                    </h2>
                </div>
                {
                    !isEmailSent &&
                    <form onSubmit={onFormSubmit}>
                        <FormInput
                            type="email"
                            name="email"
                            placeholder="Email address"
                            value={email}
                            className={inputStyle}
                            onChange={handleEmailChange}
                        />
                        {errorMessage && <FormErrorMessage message={errorMessage} />}
                        <FormSubmitButton value="Send Email" />
                    </form>
                }

                {
                    isEmailSent &&
                    <p className="mb-2 -mt-4 text-[#6B6F70]">
                        We have sent you an email to reset your password. Please check your inbox or spam folder. Thank you.
                    </p>
                }
            </div>
        </div>
    );
};