import { ChangeEvent, FormEvent } from "react";
import FormInput from "./FormInput";
import FormSubmitButton from "./FormSubmitButton";
import ErrorMessage from "./ErrorMessage";

interface FormSignInProps {
    email: string;
    password: string;
    errorMessage: string;
    onFormSubmit: (e: FormEvent<HTMLFormElement>) => void;
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function FormSignIn({ email, password, errorMessage, onFormSubmit, onInputChange }: FormSignInProps) {
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
            {errorMessage && <ErrorMessage message={errorMessage} />}
            <FormSubmitButton
                value="SIGN IN"
            />
        </form>
    )
}