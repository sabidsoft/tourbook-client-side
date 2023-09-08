import { Link } from "react-router-dom";

interface FormTextLinkProps {
    to: string;
    text: string;
}

export default function FormTextLink({ to, text }: FormTextLinkProps) {
    return (
        <Link
            to={to}
            className="block text-center text-[#4761A7] mb-6"
        >
            {text}
        </Link>
    )
}
