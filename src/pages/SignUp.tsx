// importing modules
import { FormEvent, ChangeEvent, useState, useEffect } from "react";
import { useSignUpMutation } from "../features/api/authApiEndpoints";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import FormCard from "../components/FormCard";

// type of initialState object
interface InitialState {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

// initialState object
const initialState: InitialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
}

// SignUp component
export default function SignUp() {
    const [formValue, setFormValue] = useState(initialState);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const [signUp, { isSuccess, isLoading, error }] = useSignUpMutation();

    const { name, email, password, confirmPassword } = formValue;

    // handling input elements values
    const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    }

    // handling form submit
    const onFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        setErrorMessage("");

        if (password === confirmPassword) {
            signUp({ name, email, password });
        } else {
            setErrorMessage("Password didn't match!")
        }
    }

    // if no error occured, navigate to the Home page when onSubmit event fired
    useEffect(() => {
        if (isSuccess) {
            navigate("/")
        } else {
            if (error) {
                if ("status" in error) {
                    const errMsgJSONString = 'error' in error ? error.error : JSON.stringify(error.data);
                    const errMsgJSObj = JSON.parse(errMsgJSONString);
                    setErrorMessage(errMsgJSObj.message);
                }
            }
        }
    }, [isSuccess, error, navigate])

    // loading when delay to data fetching
    if (isLoading) {
        return <Loader />
    }

    return (
        <FormCard
            name={name}
            email={email}
            password={password}
            formName={"FormSignUp"}
            confirmPassword={confirmPassword}
            errorMessage={errorMessage}
            onFormSubmit={onFormSubmit}
            onInputChange={onInputChange}
        />
    )
}