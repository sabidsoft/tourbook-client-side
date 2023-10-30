import { FormInputProps } from "./types";

export default function FormInput({
    id,
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
            id={id}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className={className}
            placeholder={placeholder}
        />
    );
};