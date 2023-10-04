import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1)
    }

    return (
        <div className="flex justify-center items-center pb-5">
            <div className="mt-56 text-center">
                <h2 className="text-4xl font-semibold mb-4">Opps!</h2>
                <h1 className="text-8xl font-bold mb-4">404</h1>
                <h2 className="text-4xl font-semibold mb-16">Page Not Found!</h2>
                <button
                    onClick={handleGoBack}
                    className="bg-[#267CB5] text-white font-medium px-4 py-2 rounded"
                >
                    Go Back
                </button>
            </div>
        </div>
    )
}