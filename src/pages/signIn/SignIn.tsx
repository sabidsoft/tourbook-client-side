import { FormEvent, ChangeEvent, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../components/common/loader/Loader";
import { InitialState } from "./types";
import { useSignInMutation } from "../../redux/features/api/userApi/userApi";
import FormCard from "../../components/cards/formCard/FormCard";

// initialState
const initialState: InitialState = {
    email: "",
    password: ""
}

export default function SignIn() {
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

        signIn({ email, password });
    }

    // handling input elements values
    const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    // when onSubmit event fired and no error occured, navigate to the Home page
    useEffect(() => {
        if (data) {
            navigate(location.state?.from?.pathname || "/", { replace: true })
        }

        if (error) {
            if ("status" in error) {
                const errMsgJSONString = 'error' in error ?
                    error.error : JSON.stringify(error.data);

                const errMsgJSObj = JSON.parse(errMsgJSONString);
                setErrorMessage(errMsgJSObj.message);
            }
        }
    }, [data, error, navigate, location.state?.from?.pathname])

    // return Loader component during to data fetching
    if (isLoading) {
        return <Loader />
    }

    // return signin FormCard component after data fetching
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