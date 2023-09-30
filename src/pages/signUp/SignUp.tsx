import { FormEvent, ChangeEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/common/loader/Loader";
import { InitialState } from "./types";
import { useSignUpMutation } from "../../redux/features/api/authApi/authApi";
import FormCard from "../../components/cards/formCard/FormCard";

// initialState
const initialState: InitialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
}

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

    if (isLoading) {
        return <Loader />
    }

    return (
        <FormCard
            name={name}
            email={email}
            formName="SignUpForm"
            password={password}
            confirmPassword={confirmPassword}
            errorMessage={errorMessage}
            onFormSubmit={onFormSubmit}
            onInputChange={onInputChange}
        />
    )
}