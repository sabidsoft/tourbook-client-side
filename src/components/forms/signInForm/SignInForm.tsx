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
                onChange={onInputChange}
            />
            <FormInput
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={onInputChange}
            />
            {
                errorMessage &&
                <FormErrorMessage message={errorMessage} />
            }
            <FormSubmitButton value="SIGN IN" />
        </form>
    )
}