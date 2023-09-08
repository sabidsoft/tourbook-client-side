import { FormEvent, ChangeEvent } from "react";
import { useState } from "react";
import loginImage from "../assets/images/Lock-512.webp"
import { Link } from "react-router-dom";
import Input from "../components/Input";
import FormSubmitButton from "../components/FormSubmitButton";

type InitialState = {
    email: string,
    password: string
}

const initialState: InitialState = {
    email: "",
    password: ""
}

export default function Login() {
    const [formValue, setFormValue] = useState(initialState);
    const { email, password } = formValue;

    const onFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        console.log(formValue)
    }

    const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    }

    return (
        <div className="h-screen pt-48">
            <div className="w-[90%] sm:w-[500px] mx-auto py-5 px-6 shadow-md rounded-lg">
                <div className="flex flex-col justify-center items-center mb-8">
                    <img
                        src={loginImage}
                        alt="Login img"
                        className="w-14 border-4 p-1 rounded-full"
                    />
                    <p className="font-bold text-[#6B6F70]">Sign In</p>
                </div>
                <form onSubmit={onFormSubmit}>
                    <Input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={onInputChange}
                    />
                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={onInputChange}
                    />
                    <FormSubmitButton />
                </form>
                <Link to="/register" className="block text-center text-[#4761A7] mb-6">
                    Don't have an account? Sign Up
                </Link>
            </div>
        </div>
    )
}