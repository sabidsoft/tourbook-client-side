import DashboardCard from "../../components/cards/dashboardCard/DashboardCard";
import ErrorMessage from "../../components/common/errorMessage/ErrorMessage";
import Loader from "../../components/common/loader/Loader";
import { useAppSelector } from "../../redux/app/hooks";
import { useGetToursByUserQuery } from "../../redux/features/api/tourApi/tourApi";

export default function Dashboard() {
    const user = useAppSelector(state => state.auth.user)
    const { data, isLoading, isError } = useGetToursByUserQuery(user?._id as string);

    if (isLoading)
        return <Loader />;

    if (isError)
        return <ErrorMessage message="There is an error occured!" />;

    return (
        <div className="mx-5 md:mx-0">
            <div className="w-full md:w-[700px] mx-auto">
                <h2 className="text-2xl text-center py-10">
                    Dashboard:
                    <span> {user?.name}</span>
                </h2>
                <hr className="mb-4" />
                {
                    data?.data.tours
                        .map(tour => (
                            <DashboardCard
                                key={tour._id}
                                tour={tour}
                            />
                        ))
                        .reverse()
                }
            </div>
        </div>
    )
}