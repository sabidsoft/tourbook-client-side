import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetToursByTagNameQuery } from "../../redux/features/api/tourApi/tourApi"
import Loader from "../../components/common/loader/Loader";
import ErrorMessage from "../../components/common/errorMessage/ErrorMessage";
import ToursCard from "../../components/cards/toursCard/ToursCard";
import SearchBar from "../../components/common/searchBar/SearchBar";
import Pagination from "../../components/common/pagination/Pagination";

export default function ToursByTagName() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();

    const [tagsParams] = useSearchParams();
    const tagName = tagsParams.get("tag_name");

    const { data, isLoading, isError } = useGetToursByTagNameQuery({ tagName: tagName as string, page: currentPage });
    const tours = data?.data.tours;

    const pagination = data?.data.pagination;
    const totalPage = pagination?.totalPage || 1;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (searchText) {
            navigate(`/tours/search/?search_query=${searchText}`);
        }
    }

    let content;

    if (isLoading)
        content = <Loader />;

    if (!isLoading && isError)
        content = <ErrorMessage message='There was an error!' />;

    if (!isLoading && !isError && tours && tours.length === 0)
        content = <ErrorMessage message='Opps! There is no more tour available with the tag.' />;

    if (!isLoading && !isError && tours && tours.length > 0)
        content =
            (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-6 mx-5 md:mx-0">
                        {
                            tours && tours
                                .map(tour => <ToursCard key={tour._id} tour={tour} />)
                        }
                    </div>
                    {
                        totalPage > 1 &&
                        <div className="py-8 mt-8 text-center">
                            <Pagination
                                totalPage={totalPage}
                                currentPage={currentPage}
                                handlePageChange={handlePageChange}
                            />
                        </div>
                    }
                </>
            );

    return (
        <div className="w-full md:w-[80%] 2xl:w-[70%] mx-auto py-8">
            <div className="pb-8">
                <SearchBar
                    searchText={searchText}
                    handleSubmit={handleSubmit}
                    handleTitleChange={handleTitleChange}
                />
            </div>
            {content}
        </div>
    )
}