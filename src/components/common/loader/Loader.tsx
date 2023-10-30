import { ScaleLoader } from "react-spinners";

export default function Loader() {
    return (
        <div className="h-screen flex justify-center items-center">
            <ScaleLoader color="#267CB5" />
        </div>
    );
};