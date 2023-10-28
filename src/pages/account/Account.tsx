import { Link } from "react-router-dom";
import defaultAvatar from "../../assets/images/default_avatar.png";
import ErrorMessage from "../../components/common/errorMessage/ErrorMessage";
import Loader from "../../components/common/loader/Loader";
import { useAppSelector } from "../../redux/app/hooks";
import { useGetUserQuery } from "../../redux/features/api/userApi/userApi";
import { linkButtonStyle } from "../../assets/styles/linkButtonStyle";


export default function Account() {

    const authUser = useAppSelector(state => state.auth.user);

    const { data, isLoading, isError } = useGetUserQuery(authUser?._id as string);
    const user = data?.data.user;

    if (isLoading)
        return <Loader />;

    if (!isLoading && isError)
        return <ErrorMessage message="Opps! Something went wrong." />;

    return (
        <div className="mx-5 md:mx-0 mt-32 mb-8">
            <div className="w-full md:w-[700px] mx-auto">
                <div className="mb-16 flex flex-col items-center">
                    <img
                        src={user?.avatar ? user.avatar : defaultAvatar}
                        alt="Avatar"
                        className="object-cover w-[150px] h-[150px] border-[#267CB5] border-4 rounded-full p-1"
                    />
                    <h2 className="text-3xl font-semibold mt-4">{user?.firstName}</h2>
                </div>
                <p className="text-lg font-semibold flex justify-between">
                    <span>First Name</span>
                    <span>{user?.firstName}</span>
                </p>
                <hr className="mb-6" />
                <p className="text-lg font-semibold flex justify-between">
                    <span>Last Name</span>
                    <span>{user?.lastName}</span>
                </p>
                <hr className="mb-6" />
                <p className="text-lg font-semibold flex justify-between">
                    <span>Email</span>
                    <span>{user?.email}</span>
                </p>
                <hr />
                <div className="flex justify-between mt-16">
                    <Link
                        to="/change-password"
                        className={linkButtonStyle}
                    >
                        Change Password
                    </Link>
                    <Link
                        to="/edit-profile"
                        className={linkButtonStyle}
                        state={user}
                    >
                        Edit Profile
                    </Link>
                </div>
            </div>
        </div>
    )
}