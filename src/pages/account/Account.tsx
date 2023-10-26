import profilePic from "../../assets/images/default_profile.png"
import LinkButton from "../../components/common/linkButton/LinkButton"
import { useAppSelector } from "../../redux/app/hooks"

export default function Account() {
    const user = useAppSelector(state => state.auth.user);

    return (
        <div className="mx-5 md:mx-0 mt-32 mb-8">
            <div className="w-full md:w-[700px] mx-auto">
                <div className="mb-16 flex flex-col items-center">
                    <img
                        src={profilePic}
                        alt="Profile Pic"
                        width={140}
                        height={140}
                        className="rounded-full"
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
                    <LinkButton
                        to="/change-password"
                        linkButtonName="Change Password"
                    />
                    <LinkButton
                        to="/edit-profile"
                        linkButtonName="Edit Account"
                    />
                </div>
            </div>
        </div>
    )
}