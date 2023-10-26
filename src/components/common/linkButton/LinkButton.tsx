import { Link } from "react-router-dom";
import { LinkButtonProps } from "./types";

export default function LinkButton({ to, linkButtonName }: LinkButtonProps) {
    return (
        <Link
            to={to}
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
            {linkButtonName}
        </Link>
    )
}