import { FormInputProps } from "./types";

export default function FormInput({
    type,
    name,
    placeholder,
    value,
    className,
    onChange
}: FormInputProps) {

    return (
        <input
            required
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className={className}
            placeholder={placeholder}
        />
    )
}