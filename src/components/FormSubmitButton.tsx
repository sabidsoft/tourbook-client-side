interface FormSubmitButtonProps {
    value: string;
}

export default function FormSubmitButton({ value }: FormSubmitButtonProps) {
    return (
        <input
            className="w-full bg-[#267CB5] text-white font-medium py-2 hover:bg-[#2e5f80] duration-300 rounded"
            type="submit"
            value={value}
        />
    )
}