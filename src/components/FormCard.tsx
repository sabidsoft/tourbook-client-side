import { ChangeEvent, FormEvent } from "react";
import formImage from "../assets/images/Lock-512.webp";
import FormTextLink from "./FormTextLink";
import FormSignIn from "./FormSignIn";
import FormSignUp from "./FormSignUp";

interface FormCardProps {
    name?: string;
    email: string;
    password: string;
    confirmPassword?: string;
    formName: string;
    errorMessage: string;
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onFormSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export default function FormCard({
    name,
    email,
    password,
    confirmPassword,
    formName,
    errorMessage,
    onInputChange,
    onFormSubmit
}: FormCardProps) {

    const haveAccount = "Already have an account? Sign In";
    const haveNotAccount = "Don't have an account? Sign Up";

    return (
        <div className="mt-36 pb-8">
            <div className="w-[90%] sm:w-[470px] mx-auto py-5 px-6 shadow-md rounded-lg">
                <div className="flex flex-col justify-center items-center mb-8">
                    <img
                        src={formImage}
                        alt="Login img"
                        className="w-14 border-4 p-1 rounded-full"
                    />
                    <p className="font-bold text-[#6B6F70]">
                        {formName === "FormSignIn" ? "Sign In" : "Sign Up"}
                    </p>
                </div>
                {
                    formName === "FormSignIn" ?
                        <FormSignIn
                            email={email}
                            password={password}
                            errorMessage={errorMessage}
                            onFormSubmit={onFormSubmit}
                            onInputChange={onInputChange}
                        />
                        :
                        <FormSignUp
                            name={name || ""} //or name={name as string}
                            email={email}
                            password={password}
                            confirmPassword={confirmPassword || ""}
                            errorMessage={errorMessage}
                            onFormSubmit={onFormSubmit}
                            onInputChange={onInputChange}
                        />
                }
                <FormTextLink
                    to={formName === "FormSignIn" ? "/signup" : "/signin"}
                    text={formName === "FormSignIn" ? haveNotAccount : haveAccount}
                />
            </div>
        </div>
    )
}
