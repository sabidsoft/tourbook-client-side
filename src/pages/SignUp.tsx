// imported modules
import { FormEvent, ChangeEvent, useState, useEffect } from "react";
import { useSignUpMutation } from "../features/api/authApiEndpoints";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import FormCard from "../components/FormCard";

// interface of initialState object
interface InitialState {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

// object of initialState
const initialState: InitialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
}

// SignUp component
export default function SignUp() {
    const [formData, setFormData] = useState(initialState);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const [signUp, { isSuccess, isLoading, error }] = useSignUpMutation();

    const { name, email, password, confirmPassword } = formData;

    // handling input elements values
    const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
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

    // when onSubmit event fired and no error occured, navigate to the Home page
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

    // return Loader component during to data fetching
    if (isLoading) {
        return <Loader />
    }

    // return signup FormCard component after data fetching
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