interface ErrorMessageProps {
    message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
    return (
        <div className="flex items-center">
            <div className="relative bg-red-200 max-w-xl mb-5 px-3 py-2 text-red-800 rounded shadow w-full">
                <span className="block text-sm">{message}</span>
            </div>
        </div>
    );
}
