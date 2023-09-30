import FormErrorMessage from "../ui/formErrorMessage/FormErrorMessage";
import FormInput from "../ui/formInput/FormInput";
import FormSubmitButton from "../ui/formSubmitButton/FormSubmitButton";
import { SignUpFormProps } from "./types";

export default function SignUpForm({
    name,
    email,
    password,
    confirmPassword,
    errorMessage,
    onFormSubmit,
    onInputChange
}: SignUpFormProps) {

    return (
        <form onSubmit={onFormSubmit}>
            <FormInput
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                onChange={onInputChange}
            />
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
            <FormInput
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={onInputChange}
            />
            {
                errorMessage &&
                <FormErrorMessage message={errorMessage} />
            }
            <FormSubmitButton value="SIGN UP" />
        </form>
    )
}