import { ButtonProps } from "./types";

export default function Button({ buttonName, onClick }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            className="
                text-white
                bg-[#267CB5]
                hover:bg-[#2e5f80]
                duration-300
                font-medium
                py-2
                px-5
                rounded-full
            "
        >
            {buttonName}
        </button>
    )
}