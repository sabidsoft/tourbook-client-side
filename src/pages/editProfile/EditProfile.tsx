import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { inputStyle } from "../../assets/styles/inputStyle";
import { InitialState } from "./types";
import { FiCamera } from "react-icons/fi";
import FormErrorMessage from "../../components/forms/ui/formErrorMessage/FormErrorMessage";
import FormInput from "../../components/forms/ui/formInput/FormInput";
import FormSubmitButton from "../../components/forms/ui/formSubmitButton/FormSubmitButton";
import defaultAvatar from "../../assets/images/default_avatar.png";
import Label from "../../components/common/label/Label";
import { useUpdateUserMutation } from "../../redux/features/api/userApi/userApi";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../components/common/loader/Loader";
import validation from "./validation";
import useTitle from "../../hooks/useTitle";

export default function EditProfile() {
    useTitle("Edit Profile");
    const navigate = useNavigate();
    const location = useLocation();
    const {
        _id: userId,
        firstName: initialFirstName,
        lastName: initiallastName,
        email: initialEmail,
        avatar: initialAvatar
    } = location.state;

    // initialState
    const initialState: InitialState = {
        firstName: initialFirstName,
        lastName: initiallastName,
        email: initialEmail,
        avatar: initialAvatar
    }

    const [inputsData, setInputsData] = useState(initialState);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [updateUser, { data, error, isLoading }] = useUpdateUserMutation();

    const { firstName, lastName, email, avatar } = inputsData;

    // handling input elements values
    const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value, files } = e.target;

        if (files)
            setInputsData({
                ...inputsData,
                [name]: files[0]
            });

        else
            setInputsData({
                ...inputsData,
                [name]: value
            });
    }

    // handling form submit
    const onFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        setErrorMessage("");

        // get frontend form validation error message
        const frontendValidationErrorMessage = validation(firstName, lastName, email);

        // set frontend form validation error message
        if (frontendValidationErrorMessage)
            return setErrorMessage(frontendValidationErrorMessage);

        // Create a FormData object and append fields to it
        const formData = new FormData();
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("email", email);
        formData.append("avatar", avatar);

        // update user
        updateUser({ userId, formData });
    }

    useEffect(() => {
        if (data) {
            navigate("/account");
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
    }, [data, error, navigate]);

    if (isLoading)
        return <Loader />;

    return (
        <div className="mt-24 pb-8">
            <div className="w-[90%] sm:w-[570px] mx-auto py-5 px-6 shadow-md rounded-lg">
                <div className="flex flex-col justify-center items-center mb-8">
                    <h2 className="font-medium text-2xl text-[#6B6F70]">
                        Edit Profile
                    </h2>
                </div>
                <form onSubmit={onFormSubmit}>
                    <div className="flex flex-col items-center mb-12">
                        {
                            typeof (avatar) === "object" ? (
                                <img
                                    src={URL.createObjectURL(avatar)}
                                    alt="Avatar"
                                    className="object-cover w-[150px] h-[150px] border-[#267CB5] border-4 rounded-full p-1"
                                />
                            ) : (
                                <img
                                    src={avatar ? avatar : defaultAvatar}
                                    alt="Avatar"
                                    className="object-cover w-[150px] h-[150px] border-[#267CB5] border-4 rounded-full p-1"
                                />
                            )
                        }

                        <label
                            htmlFor="avatar"
                            className="inline-block cursor-pointer -mt-12"
                        >
                            <FiCamera size={40} color="#fff" title="Select profile picture" />
                        </label>

                        <input
                            id="avatar"
                            name="avatar"
                            type="file"
                            accept="image/*" // Use this attribute to specify that only image files can be selected
                            onChange={onInputChange}
                            className={`${inputStyle} hidden`}
                        />
                    </div>

                    <Label htmlFor="firstName" labelName="First Name" />
                    <FormInput
                        id="firstName"
                        type="text"
                        name="firstName"
                        value={firstName}
                        className={inputStyle}
                        onChange={onInputChange}
                    />

                    <Label htmlFor="lastName" labelName="Last Name" />
                    <FormInput
                        id="lastName"
                        type="text"
                        name="lastName"
                        value={lastName}
                        className={inputStyle}
                        onChange={onInputChange}
                    />

                    <Label htmlFor="email" labelName="Email" />
                    <FormInput
                        id="email"
                        type="email"
                        name="email"
                        value={email}
                        className={inputStyle}
                        onChange={onInputChange}
                    />

                    {errorMessage && <FormErrorMessage message={errorMessage} />}
                    <FormSubmitButton value="Save Changes" />
                </form>
            </div>
        </div>
    )
}