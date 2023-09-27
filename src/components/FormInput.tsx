import { inputStyle } from "../utils/inputStyle";

type FormInputProps = {
    type: string;
    name: string;
    value: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormInput({
    type,
    name,
    placeholder,
    value,
    onChange
}: FormInputProps) {
    
    return (
        <input
            className={inputStyle}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required
        />
    )
}