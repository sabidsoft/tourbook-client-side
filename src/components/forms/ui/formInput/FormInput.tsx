import { inputStyle } from "../../../../assets/styles/inputStyle";
import { FormInputProps } from "./types";

export default function FormInput({
    type,
    name,
    placeholder,
    value,
    onChange
}: FormInputProps) {

    return (
        <input
            required
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className={inputStyle}
            placeholder={placeholder}
        />
    )
}