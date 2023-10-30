import { Link } from "react-router-dom";
import { useGetRelatedToursQuery } from "../../redux/features/api/tourApi/tourApi";
import { RelatedToursProps } from "./types";
import RelatedToursCard from "../cards/relatedToursCard/RelatedToursCard";
import Loader from "../common/loader/Loader";
import ErrorMessage from "../common/errorMessage/ErrorMessage";

export default function RelatedTours({ tags, currentTourId }: RelatedToursProps) {
    const { data, isLoading, isError } = useGetRelatedToursQuery({ tags, currentTourId });

    const tours = data?.data.tours;

    let content;

    if (isLoading)
        content = <Loader />;

    if (!isLoading && isError)
        content = <ErrorMessage message='Something went wrong!' />;

    if (!isLoading && !isError && tours && tours.length === 0)
        content = <ErrorMessage message='Opps! There is no related tours available!' />;

    if (!isLoading && !isError && tours && tours.length > 0)
        content =
            <>
                {
                    tours && tours
                        .map(tour => (
                            <Link to={`/tours/${tour._id}`} key={tour._id}>
                                <RelatedToursCard tour={tour} />
                            </Link>
                        ))
                }
            </>;


    return (
        <>
            <h1 className="text-center text-2xl text-[#38404C] font-medium mt-9 mb-2">Related Tours</h1>
            <hr className="mb-2" />
            {content}
        </>
    );
};