import { Link, useParams } from "react-router-dom";
import Loader from "../../components/common/loader/Loader";
import { useGetTourQuery } from "../../redux/features/api/tourApi/tourApi";
import ErrorMessage from "../../components/common/errorMessage/ErrorMessage";
import { LuCalendarDays } from "react-icons/lu";
import moment from "moment";
import RelatedTours from "../relatedTours/RelatedTours";

export default function SingleTour() {
    const { tourId } = useParams();

    const { data, isLoading, isError } = useGetTourQuery(tourId as string);
    const tour = data?.data.tour;

    if (isLoading)
        return <Loader />;

    if (isError)
        return <ErrorMessage message='There was an error!' />;

    return (
        <div className="flex justify-between w-[100%] sm:w-[80%] mx-auto px-5 sm:px-0">
            <div className="w-[73%]">
                <h2 className="text-center text-3xl text-[#38404C] font-bold py-5">
                    {tour?.title}
                </h2>
                <img
                    src={tour?.imageUrl}
                    alt="tour img"
                    className="w-full md:h-[400px] xl:h-[500px] object-cover"
                />
                <div className="mt-2 mb-5">
                    {tour?.tags.length !== 0 && tour?.tags.map(tag => (
                        <Link
                            to={`/tours/tag-name/${tag}`}
                            key={tag}
                            className="inline-block mr-1 text-[#267CB5] hover:text-[#2e5f80] hover:underline"
                        >
                            {`#${tag.toLowerCase()}`}
                        </Link>
                    ))}
                </div>
                <p className="mb-5 text-justify">
                    {tour?.description}
                </p>
                <p className="inline-block">
                    Created by:
                    <span className="font-semibold"> {tour?.creatorName}</span>
                </p>
                <div className="flex flex-row mb-5">
                    <LuCalendarDays size={24} />
                    <span className="ml-2">{moment(tour?.createdAt).fromNow()}</span>
                </div>
            </div>
            <div className="w-[395px] ml-4">
                <RelatedTours
                    tags={tour?.tags || []}
                    currentTourId={tourId || ""}
                />
            </div>
        </div>
    )
}