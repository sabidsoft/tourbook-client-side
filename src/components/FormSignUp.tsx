import { ChangeEvent, FormEvent } from "react";
import FormInput from "./FormInput";
import ErrorMessage from "./ErrorMessage";
import FormSubmitButton from "./FormSubmitButton";

interface FormSignUpProps {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    errorMessage: string;
    onFormSubmit: (e: FormEvent<HTMLFormElement>) => void;
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function FormSignUp({ name, email, password, confirmPassword, errorMessage, onFormSubmit, onInputChange }: FormSignUpProps) {
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
            {errorMessage && <ErrorMessage message={errorMessage} />}
            <FormSubmitButton value="SIGN UP" />
        </form>
    )
}