import DashboardCard from "../../components/cards/dashboardCard/DashboardCard";
import ErrorMessage from "../../components/common/errorMessage/ErrorMessage";
import Loader from "../../components/common/loader/Loader";
import { useAppSelector } from "../../redux/app/hooks";
import { useGetToursByUserQuery } from "../../redux/features/api/tourApi/tourApi";

export default function Dashboard() {
    const user = useAppSelector(state => state.auth.user);

    const { data, isLoading, isError } = useGetToursByUserQuery(user?._id as string);
    const tours = data?.data.tours;

    let content;

    if (isLoading)
        content = <Loader />;

    if (isError)
        content = <ErrorMessage message="There is an error occured!" />;

    if (tours?.length === 0)
        content = <ErrorMessage message='You have not create any tour yet.' />;

    if (tours && tours?.length > 0)
        content = tours && tours.map(tour => <DashboardCard key={tour._id} tour={tour} />);

    return (
        <div className="mx-5 md:mx-0">
            <div className="w-full md:w-[700px] mx-auto">
                <h2 className="text-2xl text-center pt-8 pb-2">
                    Dashboard:
                    <span> {user?.name}</span>
                </h2>
                <hr className="mb-4" />
                {content}
            </div>
        </div>
    )
}