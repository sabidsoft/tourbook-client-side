import { FormEvent, ChangeEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/common/loader/Loader";
import { InitialState } from "./types";
import { useSignUpMutation } from "../../redux/features/api/userApi/userApi";
import FormCard from "../../components/cards/formCard/FormCard";
import validation from "./validation";
import useTitle from "../../hooks/useTitle";

// initialState
const initialState: InitialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
}

export default function SignUp() {
    useTitle("Sign Up");
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialState);
    const [errorMessage, setErrorMessage] = useState("");
    const [signUp, { isSuccess, error, isLoading }] = useSignUpMutation();

    const { firstName, lastName, email, password, confirmPassword } = formData;

    // handling input elements values
    const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    // handling form submit
    const onFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        setErrorMessage("");

        // get frontend form validation error message
        const frontendValidationErrorMessage = validation(firstName, lastName, email, password, confirmPassword);

        // set frontend form validation error message
        if (frontendValidationErrorMessage)
            return setErrorMessage(frontendValidationErrorMessage);

        // create a new user
        signUp({ firstName, lastName, email, password });
    }

    useEffect(() => {
        if (isSuccess) {
            navigate("/");
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
    }, [isSuccess, error, navigate]);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <FormCard
            firstName={firstName}
            lastName={lastName}
            email={email}
            formName="SignUpForm"
            password={password}
            confirmPassword={confirmPassword}
            errorMessage={errorMessage}
            onFormSubmit={onFormSubmit}
            onInputChange={onInputChange}
        />
    );
};