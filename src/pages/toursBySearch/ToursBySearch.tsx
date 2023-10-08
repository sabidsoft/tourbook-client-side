import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetToursBySearchQuery } from "../../redux/features/api/tourApi/tourApi"
import Loader from "../../components/common/loader/Loader";
import ErrorMessage from "../../components/common/errorMessage/ErrorMessage";
import SearchBar from "../../components/common/searchBar/SearchBar";
import TourCard from "../../components/cards/tourCard/TourCard";

export default function ToursBySearch() {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("search_query");

    const [searchText, setSearchText] = useState(searchQuery || "");
    const navigate = useNavigate();

    const { data, isLoading, isError } = useGetToursBySearchQuery(searchQuery || "");
    const tours = data?.data.tours;

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

    if (isError)
        content = <ErrorMessage message='There was an error!' />;

    if (tours?.length === 0)
        content = <ErrorMessage message='Opps! There is no tour available with your search value.' />;

    if (tours && tours?.length > 0)
        content =
            (<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-6 mx-5 md:mx-0">
                {
                    tours && tours
                        .map(tour => <TourCard key={tour._id} tour={tour} />)
                }
            </div>);

    return (
        <div className="w-full md:w-[80%] 2xl:w-[60%] mx-auto py-8">
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