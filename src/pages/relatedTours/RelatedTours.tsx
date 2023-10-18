import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetRelatedToursQuery } from "../../redux/features/api/tourApi/tourApi"
import { RelatedToursProps } from "./types";
import RelatedToursCard from "../../components/cards/relatedToursCard/RelatedToursCard";
import Loader from "../../components/common/loader/Loader";
import ErrorMessage from "../../components/common/errorMessage/ErrorMessage";
import { Tour } from "../../redux/features/api/tourApi/types";
import Button from "../../components/common/button/Button";

export default function RelatedTours({ tags, currentTourId }: RelatedToursProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [showTours, setShowTours] = useState<Tour[]>([]);

    const { data, isLoading, isError } = useGetRelatedToursQuery({ tags, currentTourId, page: currentPage });
    const tours = data?.data.tours;

    const pagination = data?.data.pagination;
    const totalPage = pagination?.totalPage;

    useEffect(() => {
        if (tours)
            setShowTours(prevTours => [...prevTours, ...tours || []]);
    }, [tours])

    let content;

    if (isLoading)
        content = <Loader />

    if (!isLoading && isError)
        content = <ErrorMessage message='Something went wrong!' />;

    if (!isLoading && !isError && showTours && showTours.length === 0)
        content = <ErrorMessage message='Opps! There is no related tours available!' />;

    if (!isLoading && !isError && showTours && showTours.length > 0)
        content =
            (
                <>
                    {
                        showTours && showTours
                            .map(tour => (
                                <Link
                                    to={`/tours/${tour._id}`}
                                    key={tour._id}
                                >
                                    <RelatedToursCard
                                        tour={tour}
                                    />
                                </Link>
                            ))
                    }
                    {
                        currentPage !== totalPage &&
                        <div className="my-4">
                            <Button
                                buttonName="Load More"
                                onClick={() => setCurrentPage(currentPage + 1)}
                            />
                        </div>
                    }
                </>
            );


    return (
        <>
            <h1 className="text-center text-2xl text-[#38404C] font-medium mt-9 mb-2">Related Tours</h1>
            <hr className="mb-2" />
            {content}
        </>
    )
}