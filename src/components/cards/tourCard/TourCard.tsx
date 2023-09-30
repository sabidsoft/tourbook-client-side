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
        <div className="shadow-md rounded-lg">
            <img
                src={imageUrl}
                alt="tour img"
                className="w-full h-52 object-cover rounded-t-lg"
            />
            <div className="px-6">
                <div className="pt-2 pb-5">
                    {tags.length !== 0 && tags.map((tag) => {
                        return (
                            <span
                                key={tag}
                                className="inline-block mr-1 text-[#7D7670]"
                            >
                                {`#${tag.toLowerCase()}`}
                            </span>
                        )
                    })}
                </div>
                <h2 className="text-[#43505D] text-2xl capitalize font-medium mb-2">
                    {title}
                </h2>
                <p className="text-[#55545D] mb-12">
                    {`${description.slice(0, 60)}... `}
                    <Link
                        to={`/tours/${_id}`}
                        className="text-[#4761A7] font-medium"
                    >
                        Read More
                    </Link>
                </p>
            </div>
        </div>
    )
}