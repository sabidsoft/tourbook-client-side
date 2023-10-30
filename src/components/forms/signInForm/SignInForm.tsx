import { Link } from "react-router-dom";
import { inputStyle } from "../../../assets/styles/inputStyle";
import FormErrorMessage from "../ui/formErrorMessage/FormErrorMessage";
import FormInput from "../ui/formInput/FormInput";
import FormSubmitButton from "../ui/formSubmitButton/FormSubmitButton";
import { SignInFormProps } from "./types";

export default function SignInForm({
    email,
    password,
    errorMessage,
    onFormSubmit,
    onInputChange
}: SignInFormProps) {

    return (
        <form onSubmit={onFormSubmit}>
            <FormInput
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                className={inputStyle}
                onChange={onInputChange}
            />

            <FormInput
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                className={inputStyle}
                onChange={onInputChange}
            />

            <div className="text-center mb-5">
                <Link
                    to="/forgot-password"
                    className="text-[#4761A7] hover:underline"
                >
                    Forgot password?
                </Link>
            </div>

            {errorMessage && <FormErrorMessage message={errorMessage} />}
            <FormSubmitButton value="SIGN IN" />
        </form>
    );
};