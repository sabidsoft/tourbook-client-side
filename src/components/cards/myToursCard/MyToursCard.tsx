import { AiFillDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { MyToursCardProps } from "./types";
import { useDeleteTourMutation } from "../../../redux/features/api/tourApi/tourApi";
import Loader from "../../common/loader/Loader";
import ErrorMessage from "../../common/errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

export default function MyToursCard({ tour }: MyToursCardProps) {
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
        <div key={_id} className="flex flex-col md:flex-row shadow-md rounded-lg mt-3 bg-[#F4F4F4]">
            <img
                src={imageUrl}
                alt={title}
                className="w-full h-[200px] md:w-[35%] md:h-[150px] object-cover rounded-t-lg md:rounded-none md:rounded-l-lg"
            />
            <div className="w-full md:w-[65%] flex justify-between items-center px-8 py-8 md:py-0">
                <div>
                    <h2 className="text-xl text-[#404756] font-semibold">
                        {title}
                    </h2>
                    <p className="">
                        {`${description.slice(0, 25)}... `}
                        <Link
                            to={`/tours/${_id}`}
                            title="View Details"
                            className="text-[#267CB5] hover:text-[#2e5f80] font-medium hover:underline"
                        >
                            View Details
                        </Link>
                    </p>
                </div>
                <div className="flex">
                    <AiFillDelete
                        size={24}
                        color="#DE4C3A"
                        title="Delete Tour"
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
                            title="Edit Tour"
                        />
                    </Link>
                </div>
            </div>
        </div>
    )
}