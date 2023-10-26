import { inputStyle } from "../../../assets/styles/inputStyle";
import FormErrorMessage from "../ui/formErrorMessage/FormErrorMessage";
import FormInput from "../ui/formInput/FormInput";
import FormSubmitButton from "../ui/formSubmitButton/FormSubmitButton";
import { SignUpFormProps } from "./types";

export default function SignUpForm({
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    errorMessage,
    onFormSubmit,
    onInputChange
}: SignUpFormProps) {

    return (
        <form onSubmit={onFormSubmit}>
            <div className="flex">
                <FormInput
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={firstName}
                    className={`${inputStyle} mr-1`}
                    onChange={onInputChange}
                />

                <FormInput
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={lastName}
                    className={`${inputStyle} ml-1`}
                    onChange={onInputChange}
                />
            </div>

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

            <FormInput
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                className={inputStyle}
                onChange={onInputChange}
            />
            
            {errorMessage && <FormErrorMessage message={errorMessage} />}
            <FormSubmitButton value="SIGN UP" />
        </form>
    )
}