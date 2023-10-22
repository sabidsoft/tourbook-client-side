import { useAppSelector } from "../../../redux/app/hooks";
import { useLikeTourMutation } from "../../../redux/features/api/tourApi/tourApi";
import { BsHandThumbsUp, BsHandThumbsUpFill } from "react-icons/bs";
import { LikeTourProps } from "./types";

export default function LikeTour({ likedUserIds, tourId }: LikeTourProps) {
    const user = useAppSelector(state => state.auth.user);
    const [likeTour, { isLoading }] = useLikeTourMutation();

    const likedUserId = likedUserIds.find(likedUserId => likedUserId === user?._id);

    const handleLike = () => {
        likeTour(tourId);
    };

    // Like button tooltip condition start
    let likeBtnTooltip;

    if (likedUserIds.length === 0)
        likeBtnTooltip = "No like";

    if (likedUserIds.length === 1 && likedUserId)
        likeBtnTooltip = "You";

    if (likedUserIds.length === 1 && !likedUserId)
        likeBtnTooltip = "1 other";

    if (likedUserIds.length === 2 && likedUserId)
        likeBtnTooltip = `You and ${likedUserIds.length - 1} other`;

    if (likedUserIds.length > 2 && likedUserId)
        likeBtnTooltip = `You and ${likedUserIds.length - 1} others`;

    if (likedUserIds.length > 1 && !likedUserId)
        likeBtnTooltip = `${likedUserIds.length} others`;
    // Like button tooltip condition end

    return (
        <button
            onClick={handleLike}
            disabled={isLoading ? true : false}
            title={likeBtnTooltip}
            className="flex justify-end w-[110px] hover:opacity-80"
        >
            {
                likedUserId ? (
                    <>
                        <BsHandThumbsUpFill
                            size={20}
                            color={"#267CB5"}
                        />
                    </>
                ) : (
                    <>
                        <BsHandThumbsUp
                            size={20}
                            color={"#606266"}
                        />
                    </>
                )
            }
            &nbsp;
            <span className={`font-medium ${likedUserId ? "text-[#267CB5]" : "text-[#606266]"}`}>
                {likedUserIds.length === 0 ? "" : likedUserIds.length}
                {likedUserIds.length > 1 ? " Likes" : " Like"}
            </span>
        </button>
    )
}