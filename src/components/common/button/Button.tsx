import { ButtonProps } from "./types";

export default function Button({ buttonName, handlePageChange }: ButtonProps) {
    return (
        <button
            onClick={handlePageChange}
            className="
                text-white
                bg-[#245575]
                hover:bg-[#2e5f80]
                duration-300
                font-medium
                py-2
                px-4
                rounded-full
            "
        >
            {buttonName}
        </button>
    )
}