import { FormEvent, ChangeEvent, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../components/common/loader/Loader";
import { useSignInMutation } from "../../redux/features/api/userApi/userApi";
import FormCard from "../../components/cards/formCard/FormCard";
import validation from "./validation";
import { InitialState } from "./types";
import useTitle from "../../hooks/useTitle";

// initialState
const initialState: InitialState = {
    email: "",
    password: ""
}

export default function SignIn() {
    useTitle("Sign In");
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState(initialState);
    const [errorMessage, setErrorMessage] = useState("");
    const [signIn, { data, error, isLoading }] = useSignInMutation();

    const { email, password } = formData;

    // handling form submit
    const onFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        setErrorMessage("");

        // get frontend form validation error message
        const frontendValidationErrorMessage = validation(email, password);

        // set frontend form validation error message
        if (frontendValidationErrorMessage)
            return setErrorMessage(frontendValidationErrorMessage);

        // login user
        signIn({ email, password });
    }

    // handling input elements values
    const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        })
    }

    useEffect(() => {
        if (data) {
            navigate(location.state?.from?.pathname || "/", { replace: true });
        }

        if (error) {
            if ("status" in error) {
                // get backend form validation error message
                const errMsgJSONString = 'error' in error ? error.error : JSON.stringify(error.data);
                const errMsgJSObj = JSON.parse(errMsgJSONString);

                // set backend form validation error message
                setErrorMessage(errMsgJSObj.message);
            }
        }
    }, [data, error, navigate, location.state?.from?.pathname])

    if (isLoading) {
        return <Loader />;
    }

    return (
        <FormCard
            email={email}
            password={password}
            formName="SignInForm"
            errorMessage={errorMessage}
            onFormSubmit={onFormSubmit}
            onInputChange={onInputChange}
        />
    )
}