import { useState } from "react";
import MyToursCard from "../../components/cards/myToursCard/MyToursCard";
import ErrorMessage from "../../components/common/errorMessage/ErrorMessage";
import Loader from "../../components/common/loader/Loader";
import Pagination from "../../components/common/pagination/Pagination";
import { useAppSelector } from "../../redux/app/hooks";
import { useGetToursByUserQuery } from "../../redux/features/api/tourApi/tourApi";
import { Link } from "react-router-dom";
import { linkButtonStyle } from "../../assets/styles/linkButtonStyle";
import useTitle from "../../hooks/useTitle";

export default function MyTours() {
    useTitle("My Tours");
    const [currentPage, setCurrentPage] = useState(1);
    const user = useAppSelector(state => state.auth.user);
    const { data, isLoading, isError } = useGetToursByUserQuery({ userId: user?._id as string, page: currentPage });

    const tours = data?.data.tours;

    const pagination = data?.data.pagination;
    const totalPage = pagination?.totalPage || 1;

    // handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    let content;

    if (isLoading)
        content = <Loader />;

    if (!isLoading && isError)
        content = <ErrorMessage message="Something went wrong." />;

    if (!isLoading && !isError && tours && tours.length === 0)
        content = (
            <>
                <ErrorMessage message='Opps! You have not add any tour yet.' />
                <div className="my-8 text-center">
                    <Link
                        to="/add-tour"
                        className={linkButtonStyle}
                    >
                        Add Tour
                    </Link>
                </div>
            </>
        );

    if (!isLoading && !isError && tours && tours.length > 0)
        content =
            (
                <>
                    {tours && tours.map(tour => <MyToursCard key={tour._id} tour={tour} />)}
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
                <h2 className="text-3xl text-center font-medium my-5">
                    My Tours
                </h2>
                <hr className="mb-3" />
                {content}
            </div>
        </div>
    );
};