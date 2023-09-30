import { Link } from "react-router-dom";
import { FormLinkProps } from "./types";

export default function FormLink({ to, text }: FormLinkProps) {
    return (
        <Link
            to={to}
            className="
                block
                text-center
                text-[#4761A7]
                mb-6
            "
        >
            {text}
        </Link>
    )
}
