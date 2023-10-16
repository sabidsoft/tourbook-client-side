import { useState } from "react"
import DashboardCard from "../../components/cards/dashboardCard/DashboardCard";
import ErrorMessage from "../../components/common/errorMessage/ErrorMessage";
import Loader from "../../components/common/loader/Loader";
import Pagination from "../../components/common/pagination/Pagination";
import { useAppSelector } from "../../redux/app/hooks";
import { useGetToursByUserQuery } from "../../redux/features/api/tourApi/tourApi";

export default function Dashboard() {
    const [currentPage, setCurrentPage] = useState(1);
    const user = useAppSelector(state => state.auth.user);

    const { data, isLoading, isError } = useGetToursByUserQuery({ userId: user?._id as string, page: currentPage });
    const tours = data?.data.tours;

    const pagination = data?.data.pagination;
    const totalPage = pagination?.totalPage || 1;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    }

    let content;

    if (isLoading)
        content = <Loader />;

    if (isError)
        content = <ErrorMessage message="There is an error occured!" />;

    if (tours?.length === 0)
        content = <ErrorMessage message='You have not create any tour yet.' />;

    if (tours && tours?.length > 0)
        content =
            (
                <>
                    {tours && tours.map(tour => <DashboardCard key={tour._id} tour={tour} />)}
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
        <div className="mx-5 md:mx-0 mb-8">
            <div className="w-full md:w-[700px] mx-auto">
                <h2 className="text-2xl text-center pt-8 pb-2">
                    Dashboard:
                    <span> {user?.name}</span>
                </h2>
                <hr />
                {content}
            </div>
        </div>
    )
}