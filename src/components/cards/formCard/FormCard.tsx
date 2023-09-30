import formImage from "../../../assets/images/Lock-512.webp";
import SignInForm from "../../forms/signInForm/SignInForm";
import SignUpForm from "../../forms/signUpForm/SignUpForm";
import FormLink from "../../forms/ui/formLink/FormLink";
import { FormCardProps } from "./types";

const haveAnAccount = "Already have an account? Sign In";
const haveNotAnAccount = "Don't have an account? Sign Up";

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
                        {formName === "SignInForm" ? "Sign In" : "Sign Up"}
                    </p>
                </div>
                {
                    formName === "SignInForm" ?
                        <SignInForm
                            email={email}
                            password={password}
                            errorMessage={errorMessage}
                            onFormSubmit={onFormSubmit}
                            onInputChange={onInputChange}
                        />
                        :
                        <SignUpForm
                            name={name || ""} //or name={name as string}
                            email={email}
                            password={password}
                            confirmPassword={confirmPassword || ""}
                            errorMessage={errorMessage}
                            onFormSubmit={onFormSubmit}
                            onInputChange={onInputChange}
                        />
                }
                <FormLink
                    to={formName === "SignInForm" ? "/signup" : "/signin"}
                    text={formName === "SignInForm" ? haveNotAnAccount : haveAnAccount}
                />
            </div>
        </div>
    )
}