import TourCard from "../../components/cards/tourCard/TourCard";
import ErrorMessage from "../../components/common/errorMessage/ErrorMessage";
import Loader from "../../components/common/loader/Loader";
import { useGetToursQuery } from "../../redux/features/api/tourApi/tourApi";

export default function Home() {
    const { data, isLoading, isError } = useGetToursQuery();
    const tours = data?.data.tours;

    if (isLoading)
        return <Loader />;

    if (!isLoading && isError)
        return <ErrorMessage message='There was an error!' />;

    if (!isLoading && !isError && tours?.length === 0)
        return <ErrorMessage message='No tours found!' />;

    return (
        <div className="w-full md:w-[80%] 2xl:w-[60%] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-6 my-16 mx-5 md:mx-0">
                {
                    tours && tours
                        .map(tour => <TourCard key={tour._id} tour={tour} />)
                        .reverse()
                }
            </div>
        </div>
    )
}