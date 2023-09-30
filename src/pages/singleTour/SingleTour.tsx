import { useParams } from "react-router-dom";
import Loader from "../../components/common/loader/Loader";
import { useGetTourQuery } from "../../redux/features/api/tourApi/tourApi";
import ErrorMessage from "../../components/common/errorMessage/ErrorMessage";
import { LuCalendarDays } from "react-icons/lu";
import moment from "moment";

export default function SingleTour() {
    const { tourId } = useParams();

    const { data, isLoading, isError } = useGetTourQuery(tourId as string);
    const tour = data?.data.tour;

    if (isLoading)
        return <Loader />;

    if (!isLoading && isError)
        return <ErrorMessage message='There was an error!' />;

    return (
        <div className="w-[100%] sm:w-[80%] mx-auto px-5 sm:px-0">
            <img
                src={tour?.imageUrl}
                alt="tour img"
                className="w-full h-[600px] object-cover"
            />
            <div className="pt-2">
                {tour?.tags.length !== 0 && tour?.tags.map((tag) => {
                    return (
                        <span
                            key={tag}
                            className="inline-block mr-1 text-[#7D7670]"
                        >
                            {`#${tag.toLowerCase()}`}
                        </span>
                    )
                })}
            </div>
            <h2 className="text-center text-3xl text-[#38404C] font-bold py-8">
                {tour?.title}
            </h2>
            <p className="inline-block mb-2">
                Created by:
                <span className="font-semibold"> {tour?.creatorName}</span>
            </p>
            <div className="flex flex-row mb-8">
                <LuCalendarDays size={24} />
                <span className="ml-2">{moment(tour?.createdAt).fromNow()}</span>
            </div>
            <p className="pb-8">
                {tour?.description}
            </p>
        </div>
    )
}