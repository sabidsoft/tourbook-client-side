type FormInputProps = {
    type: string;
    name: string;
    value: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormInput({ type, name, placeholder, value, onChange }: FormInputProps) {
    return (
        <input
            className="w-full block mb-5 px-3 py-2 border rounded focus:outline-none focus:border-[#267CB5]"
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required
        />
    )
}