import { Link } from "react-router-dom";
import { TourCardProps } from "./types";

export default function TourCard({
    tour: {
        _id,
        imageUrl,
        tags,
        title,
        description
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
                <div className="pt-2 pb-5">
                    {tags.length !== 0 && tags.map(tag => (
                        <Link
                            to={`/tours/tags?tag_name=${tag}`}
                            key={tag}
                            className="inline-block mr-1 text-[#267CB5] hover:text-[#2e5f80] hover:underline"
                        >
                            {`#${tag.toLowerCase()}`}
                        </Link>
                    ))}
                </div>
                <h2 className="text-[#43505D] text-2xl capitalize font-medium mb-2">
                    {title}
                </h2>
                <p className="text-[#55545D] text-justify mb-12">
                    {`${description.slice(0, 60)}... `}
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