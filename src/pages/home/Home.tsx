import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ToursCard from "../../components/cards/toursCard/ToursCard";
import ErrorMessage from "../../components/common/errorMessage/ErrorMessage";
import Loader from "../../components/common/loader/Loader";
import { useGetToursQuery } from "../../redux/features/api/tourApi/tourApi";
import SearchBar from "../../components/common/searchBar/SearchBar";

export default function Home() {
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();

    const { data, isLoading, isError } = useGetToursQuery();
    const tours = data?.data.tours;

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (searchText) {
            navigate(`/tours/search?search_query=${searchText}`);
        }
    }

    let content;

    if (isLoading)
        content = <Loader />;

    if (isError)
        content = <ErrorMessage message='There was an error!' />;

    if (tours?.length === 0)
        content = <ErrorMessage message='Opps! Sorry! There is no tour available.' />;

    if (tours && tours?.length > 0)
        content =
            (<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-6 mx-5 md:mx-0">
                {
                    tours && tours
                        .map(tour => <ToursCard key={tour._id} tour={tour} />)
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