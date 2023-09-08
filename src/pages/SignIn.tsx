import { FormEvent, ChangeEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSignInMutation } from "../features/api/authApiEndpoints";
import Loader from "../components/Loader";
import FormCard from "../components/FormCard";

type InitialState = {
    email: string;
    password: string;
}

const initialState: InitialState = {
    email: "",
    password: ""
}

export default function SignIn() {
    const [formValue, setFormValue] = useState(initialState);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const [signIn, { isSuccess, isLoading, error }] = useSignInMutation();

    const { email, password } = formValue;

    const onFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        setErrorMessage("");

        signIn({ email, password })
    }

    const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
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

    // loading when data fetching
    if (isLoading) {
        return <Loader />
    }

    return (
        <FormCard
            email={email}
            password={password}
            formName={"FormSignIn"}
            errorMessage={errorMessage}
            onFormSubmit={onFormSubmit}
            onInputChange={onInputChange}
        />
    )
}