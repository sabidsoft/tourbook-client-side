import { AiFillDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { DashboardCardProps } from "./types";
import { useDeleteTourMutation } from "../../../redux/features/api/tourApi/tourApi";
import Loader from "../../common/loader/Loader";
import ErrorMessage from "../../common/errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

export default function DashboardCard({ tour }: DashboardCardProps) {
    const { _id, imageUrl, title, description } = tour;

    const [deleteTour, { isLoading, isError }] = useDeleteTourMutation();

    // handle delete tour
    const handleDeleteTour = (tourId: string) => {
        deleteTour(tourId);
    }

    if (isLoading)
        return <Loader />

    if (isError)
        return <ErrorMessage message="There is an error occured!" />


    return (
        <div key={_id} className="flex flex-col md:flex-row shadow-md rounded mb-4">
            <div className="md:w-[250px] md:h-[150px] grow-0">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover rounded-t md:rounded-l"
                />
            </div>
            <div className="grow flex justify-between items-center px-8 py-8 md:py-0">
                <div>
                    <h2 className="text-xl text-[#404756] font-semibold">
                        {title}
                    </h2>
                    <p className="">
                        {description.slice(0, 35)}...
                    </p>
                </div>
                <div className="flex">
                    <AiFillDelete
                        size={24}
                        color="#DE4C3A"
                        className="mr-1 cursor-pointer"
                        onClick={() => handleDeleteTour(_id)}
                    />
                    <Link
                        to={`/edit-tour/${_id}`}
                        state={tour}
                    >
                        <BiSolidEdit
                            size={24}
                            color="#4EAFEA"
                        />
                    </Link>
                </div>
            </div>
        </div>
    )
}