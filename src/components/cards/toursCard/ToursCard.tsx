import { Link } from "react-router-dom";
import { TourCardProps } from "./types";
import LikeTour from "../../common/likeTour/LikeTour";

export default function ToursCard({
    tour: {
        _id,
        imageUrl,
        tags,
        title,
        description,
        likedUsers
    }
}: TourCardProps) {

    return (
        <div className="shadow-md rounded-lg bg-[#F4F4F4]">
            <img
                src={imageUrl}
                alt="tour img"
                className="w-full h-52 object-cover rounded-t-lg"
            />
            <div className="px-6">
                <div className="flex justify-between mt-3 mb-5">
                    <div>
                        {tags.length !== 0 && tags.map(tag => (
                            <Link
                                to={`/tours/tags?tag_name=${tag}`}
                                key={tag}
                                className="inline-block mr-1 text-sm text-[#267CB5] hover:text-[#2e5f80] hover:underline"
                            >
                                {`#${tag.toLowerCase()}`}
                            </Link>
                        ))}
                    </div>
                    <div>
                        <LikeTour
                            likedUserIds={likedUsers}
                            tourId={_id}
                        />
                    </div>
                </div>
                <h2 className="text-[#43505D] text-2xl capitalize font-medium mb-2">
                    {title}
                </h2>
                <p className="text-[#55545D] text-justify mb-12">
                    {`${description.slice(0, 80)}... `}
                    <Link
                        to={`/tours/${_id}`}
                        title="View Details"
                        className="text-[#267CB5] hover:text-[#2e5f80] font-medium hover:underline"
                    >
                        View Details
                    </Link>
                </p>
            </div>
        </div>
    )
}