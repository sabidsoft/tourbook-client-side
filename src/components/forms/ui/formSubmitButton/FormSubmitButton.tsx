import { FormSubmitButtonProps } from "./types";

export default function FormSubmitButton({ value }: FormSubmitButtonProps) {
    return (
        <input
            type="submit"
            value={value}
            className="
                w-full
                text-white
                font-medium
                py-2
                mb-5
                rounded
                bg-[#267CB5]
                hover:bg-[#2e5f80]
                duration-300
            "
        />
    )
}