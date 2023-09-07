type InputProps = {
    type: string,
    name: string,
    value: string,
    placeholder: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input({ type, name, placeholder, value, onChange }: InputProps) {
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